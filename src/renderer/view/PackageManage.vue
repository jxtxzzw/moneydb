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
                h('router-link', {
                  props: {
                    to: `/Package/${params.row.package_id}`
                    // onclick直接发消息到后台吧，不要再开一个页面了
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'error',
                      disabled: this.lackingAuth
                    },
                    style: {
                      margin: '5px 5px 5px 5px'
                    }
                  }, '删除')
                ])
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
            }
          })
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
