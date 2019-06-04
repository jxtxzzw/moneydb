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
                    to: `/WareHouseModify/${params.row.package_id}`
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
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Query', payload)
          .then(response => {
            this.rawData = response.data
            for (const x of this.rawData) {
              x.location = x.location.join('/')
            }
          })
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
