<template>
  <div>
    <filter-table @on-search="onSearch"
                  :data="users"
                  :columns="tableColumns" />
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page :total="rawData == null ? 0 : rawData.length"
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
  
  const packageStatus = {
    0: {
      value: 0,
      name: '全部'
    },
    1: {
      value: 1,
      name: '已锁定',
      color: 'red'
    },
    2: {
      value: 2,
      name: '已送达',
      color: 'green'
    },
    3: {
      value: 3,
      name: '运输中',
      color: 'blue'
    },
    4: {
      value: 4,
      name: '派件中',
      color: 'orange'
    }
  }
  
  export default {
    name: 'PackageManage',
    components: {FilterTable},
    data () {
      return {
        sizer: [1, 5, 10],
        pageNumber: 1,
        pageSize: 10,
        rawData: [1, 2, 3],
        users: [],
        tableColumns: [
          {
            title: '包裹ID',
            key: 'package_id',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '手机号',
            key: 'phone',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '始发地',
            key: 'from',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '目的地',
            key: 'to',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '物流信息',
            key: 'info',
            filter: {
              type: 'Input'
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
                      long: ''
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
                      type: 'primary'
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
                      type: 'error'
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
    created () {
      this.users = [
        {
          package_id: '小明',
          phone: '17760172601',
          from: '1023007219@qq.com',
          to: '50',
          info: '111',
          status: '1'
        }, {
          package_id: '小明',
          phone: '18860172601',
          from: '1023007219@qq.com',
          to: '50',
          info: '111',
          status: '2'
        }
      ]
    },
    methods: {
      formatStatus (value, status) {
        return status[value] || {value: '', name: ''}
      },
      onSearch (search) {
        console.log(search)
        let newUser = []
        for (const u of this.staff) {
          if (u.phone.includes(search.phone)) {
            newUser.push(u)
          }
        }
        this.users = newUser
        // 然后发到后台
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
      generatePagedTableData () {
        const from = (this.pageNumber - 1) * this.pageSize
        const to = this.pageNumber * this.pageSize - 1
        this.rawData = this.requestData(from, to)
      },
      requestData (from, to) {
        console.log('axios')
      }
    },
    mounted () {
      this.generatePagedTableData()
    }
  }
</script>

<style scoped>

</style>
