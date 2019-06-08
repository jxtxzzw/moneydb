<template>
  <div>
    <Alert show-icon>
      <template slot="desc">
        只能查看分配给自己的、且正在派件中的订单。 <br/>
      </template>
    </Alert>
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
  // import router from '../router'
  export default {
    inject: ['reload'],
    name: 'PackageManage',
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
            title: '操作',
            key: 'action',
            render: (h, params) => {
              const _this = this
              return h('div', [
                h('Button', {
                  props: {
                    type: 'warning',
                    disabled: this.lackingAuth
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: async function () {
                      await _this.dispatchDone(params.row.package_id)
                    }
                  }
                }, '标记为已签收')
              ])
            }
          }
        ]
      }
    },
    methods: {
      async dispatchDone (id) {
        await this.$http.post('http://127.0.0.1:3000/DispatchPair/Done', {
          package_id: id
        })
          .then(response => {
            if (response.status === 200) {
              // 前端路由到自己是不会刷新的
              // location.reload() 会强制刷新，用户体验不好
              // this.$router.go(0) 用户体验也不好
              // router.push('/DispatchingView')
              // this.reload() // this.reload() 不能刷新表格内容，表格内容是局部刷新的
              this.generatePagedTableData()
            } else {
              this.$Modal.error({
                title: '操作失败'
              })
            }
          })
      },
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
        await this.$http.post('http://127.0.0.1:3000/DispatchPair/Query', payload)
          .then(response => {
            this.rawData = response.data
            for (const x of this.rawData) {
              x.sender_name = x.Package.sender_name
              x.sender_phone = x.Package.sender_phone
              x.receiver_name = x.Package.receiver_name
              x.receiver_phone = x.Package.receiver_phone
              x.receiver_city = x.Package.receiver_city
              x.receiver_address = x.Package.receiver_address
              x.receiver_city = x.receiver_city.join('/')
            }
          })
      }
    },
    async mounted () {
      this.generatePagedTableData()
      await this.$http.post('http://127.0.0.1:3000/DispatchPair/Count').then(response => {
        this.total = response.data.count
      })
    }
  }
</script>

<style scoped>

</style>
