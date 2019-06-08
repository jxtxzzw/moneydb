<template>
  <div>
    <filter-table @on-search="onSearch"
                  :data="staff"
                  :columns="tableColumns" />
    <div style="margin: 10px; overflow: hidden">
      <div style="float: right">
        <Page tal="staff == null ? 0 : staff.length"
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
  
  const staffStatus = {
    0: {
      value: 0,
      name: '全部'
    },
    1: {
      value: 1,
      name: '营业',
      color: 'red'
    },
    2: {
      value: 2,
      name: '派件',
      color: 'green'
    },
    3: {
      value: 3,
      name: '运输',
      color: 'blue'
    },
    4: {
      value: 4,
      name: '管理',
      color: 'orange'
    }
  }
  
  export default {
    name: 'StaffManage',
    components: {FilterTable},
    data () {
      return {
        sizer: [1, 5, 10],
        pageNumber: 1,
        pageSize: 10,
        staff: [],
        tableColumns: [
          {
            title: '员工工号',
            key: 'staff_id',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '姓名',
            key: 'name',
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
            title: '出生年月',
            key: 'birthday',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '月薪',
            key: 'salary',
            filter: {
              type: 'Input'
            }
          },
          {
            title: '类型',
            key: 'status',
            filter: {
              type: 'Select',
              option: staffStatus
            },
            render: (h, params) => {
              return h('Tag', {
                slot: 'context',
                props: {
                  color: this.formatStatus(params.row.status, staffStatus).color
                }
              }, this.formatStatus(params.row.status, staffStatus).name)
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
                    to: '/StaffModify/0'
                  }
                }, [
                  h('Button', {
                    props: {
                      type: 'success',
                      long: true,
                      disabled: false
                    }
                  }, '新建')
                ])
              }
            },
            render: (h, params) => {
              return h('div', [
                h('router-link', {
                  props: {
                    to: `/StaffModify/${params.row.package_id}`
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
                    to: `/StaffModify/${params.row.package_id}`
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
      this.staff = [
        {
          staff_id: '1',
          name: '小明',
          phone: '17760172601',
          birthday: '1023007219@qq.com',
          salary: '50',
          status: '1'
        }, {
          staff_id: '1',
          name: '小明',
          phone: '17760172601',
          birthday: '1023007219@qq.com',
          salary: '50',
          status: '1'
        }
      ]
    },
    methods: {
      formatStatus (value, status) {
        return status[value] || {value: '', name: ''}
      },
      onSearch (search) {
        let newUser = []
        for (const u of this.staff) {
          if (u.phone.includes(search.phone)) {
            newUser.push(u)
          }
        }
        this.staff = newUser
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
        this.staff = this.requestData(from, to)
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
