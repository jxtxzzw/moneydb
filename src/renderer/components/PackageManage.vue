<template>
  <div>
  <filter-table @on-search="onSearch"
                :data="users"
                :columns="tableColumns">
  </filter-table>
  </div>
</template>

<script>
  import FilterTable from './FilterTable'
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
        users: [],
        rawData: [],
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
        for (const u of this.users) {
          if (u.phone.includes(search.phone)) {
            newUser.push(u)
          }
        }
        this.users = newUser
      }
    },
    mounted () {
      this.rawData = this.users
      // 请求数据
    }
  }
</script>

<style scoped>

</style>
