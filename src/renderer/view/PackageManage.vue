<template>
  <div>
    <filter-table @on-search="onSearch"
                  :data="rawData"
                  :columns="tableColumns" />
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page :total="total"
              :current="1"
              @on-change="changePage"
              show-total
              show-sizer
              :page-size="pageSize"
              :page-size-opts="sizer"
              @on-page-size-change="changePageSize"/>
      </div>
    </div>
    <Modal v-model="confirmDelete" width="360">
      <p slot="header" style="color:#f60;text-align:center">
        <Icon type="ios-information-circle"></Icon>
        <span>删除确认</span>
      </p>
      <div style="text-align:center">
        <p>您正在删除一个包裹，这个操作不可撤销。</p>
        <p>是否继续删除</p>
      </div>
      <div slot="footer">
        <Button type="error" size="large" long :loading="modal_loading" @click="del">我已经想清楚了，删除！</Button>
      </div>
    </Modal>
  </div>
</template>

<script>
  import FilterTable from '../components/FilterTable'
  import TableExpandRow from '../components/TableExpandRow'
  
  const packageStatus = {
    '已揽件': {
      value: '已揽件',
      name: '已揽件',
      color: 'yellow'
    },
    '运输中': {
      value: '运输中',
      name: '运输中',
      color: 'red'
    },
    '派件中': {
      value: '派件中',
      name: '派件中',
      color: 'blue'
    },
    '已签收': {
      value: '已签收',
      name: '已签收',
      color: 'green'
    }
  }
  
  export default {
    name: 'PackageManage',
    components: {FilterTable, TableExpandRow},
    data () {
      return {
        total: 0,
        rawData: [],
        sizer: [1, 5, 10],
        pageNumber: 1,
        pageSize: 10,
        lackingAuth: false,
        confirmDelete: false,
        modal_loading: false,
        deleteTarget: '',
        tableColumns: [
          {
            title: '包裹ID',
            key: 'package_id',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '寄件人姓名',
            key: 'sender_name',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '寄件人联系电话',
            key: 'sender_phone',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '寄件人所在城市',
            key: 'sender_city',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '寄件人地址',
            key: 'sender_address',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '寄件时间',
            key: 'send_date'
          },
          {
            title: '收件人姓名',
            key: 'receiver_name',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '收件人联系电话',
            key: 'receiver_phone',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '收件人所在城市',
            key: 'receiver_city',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '收件人地址',
            key: 'receiver_address',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '收件时间',
            key: 'receive_date'
          },
          {
            type: 'expand',
            title: '物流信息',
            key: 'info',
            filter: {
              type: 'Input'
            },
            render: (h, params) => {
              return h(TableExpandRow, {
                props: {
                  package_id: params.row.package_id.toString()
                }
              })
            }
          },
          {
            title: '状态',
            key: 'status',
            filter: {
              type: 'Select',
              option: packageStatus
            },
            render: (h, params) => {
              return h('Tag', {
                slot: 'context',
                props: {
                  color: this.formatStatus(params.row.status, packageStatus).color
                }
              }, this.formatStatus(params.row.status, packageStatus).name)
            }
          },
          {
            title: '操作',
            key: 'action',
            filter: {
              type: 'Render',
              render: (h) => {
                return h('router-link', {
                  props: {
                    to: '/PackageModify/0'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'success',
                      long: true,
                      disabled: this.lackingAuth
                    }
                  }, '新建')
                ])
              }
            },
            render: (h, params) => {
              return h('div', [
                h('router-link', {
                  props: {
                    to: `/PackageModify/${params.row.package_id}`
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'primary',
                      disabled: this.lackingAuth
                    },
                    style: {
                      margin: '5px 5px 5px 5px'
                    }
                  }, '修改')
                ]),
                h('Button', {
                  props: {
                    type: 'error',
                    disabled: this.lackingAuth
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: () => {
                      this.confirmDelete = true
                      this.deleteTarget = params.row.uuid
                    }
                  }
                }, '删除')
              ])
            }
          }
        ]
      }
    },
    methods: {
      formatStatus (value, status) {
        return status[value] || {value: '', name: ''}
      },
      onSearch (search) {
        this.generatePagedTableData(search)
      },
      changePage (pageNumber) {
        this.pageNumber = pageNumber
        this.generatePagedTableData()
      },
      changePageSize (pageSize) {
        this.pageSize = pageSize
        this.pageNumber = 1
        this.generatePagedTableData()
      },
      async generatePagedTableData (params = null) {
        const payload = {
          where: params,
          offset: (this.pageNumber - 1) * this.pageSize,
          limit: this.pageSize
        }
        this.requestData(payload)
      },
      async requestData (payload) {
        await this.$http.post('http://127.0.0.1:3000/Package/Query', payload)
          .then(response => {
            this.rawData = response.data
            for (const x of this.rawData) {
              x.sender_city = x.sender_city.join('/')
              x.receiver_city = x.receiver_city.join('/')
              x.send_date = x.send_date.toString().substring(0, 10)
              x.receive_date = x.receive_date.toString().substring(0, 10)
            }
          })
      },
      async del () {
        const _this = this
        this.modal_loading = true
        await this.$http.post('http://127.0.0.1:3000/Package/Delete', {
          package_id: this.deleteTarget
        })
          .then(response => {
            if (response.status === 200) {
              this.$Message.success('删除成功')
              _this.confirmDeletem = false
            }
          })
          .catch(error => {
            _this.$Modal.error({
              title: '操作失败',
              content: error.data
            })
          })
        _this.modal_loading = false
        this.generatePagedTableData()
      }
    },
    async mounted () {
      this.generatePagedTableData()
      await this.$http.post('http://127.0.0.1:3000/Package/Count').then(response => {
        this.total = response.data.count
      })
    }
  }
</script>

<style scoped>

</style>
