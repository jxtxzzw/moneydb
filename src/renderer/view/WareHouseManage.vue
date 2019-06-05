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
        <p>您正在删除一个仓库，这个操作不可撤销。</p>
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
  
  export default {
    name: 'WareHouseManage',
    components: {FilterTable},
    data () {
      return {
        total: 0,
        rawData: [],
        sizer: [1, 5, 10],
        pageNumber: 1,
        pageSize: 10,
        lackingAuth: false,
        confirmDelete: false,
        deleteTarget: '',
        modal_loading: false,
        tableColumns: [
          {
            title: '仓库ID',
            key: 'warehouse_id',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '仓库名称',
            key: 'warehouse_name',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '仓库负责人',
            key: 'warehouse_manager',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '所在地',
            key: 'location',
            filter: {
              type: 'Input'
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
                    to: '/WareHouseModify/0'
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
                    to: `/WareHouseModify/${params.row.warehouse_id}`
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
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Query', payload)
          .then(response => {
            this.rawData = response.data
            for (const x of this.rawData) {
              x.location = x.location.join('/')
            }
          })
      },
      async del () {
        const _this = this
        this.modal_loading = true
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Delete', {
          warehouse_id: this.deleteTarget
        })
          .then(response => {
            if (response.status === 200) {
              this.$Message.success('删除成功')
              _this.confirmDelete = false
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
      await this.$http.post('http://127.0.0.1:3000/WareHouse/Count').then(response => {
        this.total = response.data.count
      })
    }
  }
</script>

<style scoped>

</style>
