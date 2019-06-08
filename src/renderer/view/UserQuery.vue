<template>
  <div>
    <Card>
      <Input v-model="phone" enter-button placeholder="请输入您的手机号">
        <Button slot="append" icon="ios-search" @click="userQuery()">查询</Button>
      </Input>
    </Card>
    <Card>
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
    </Card>
    <Modal
        v-model="toRate"
        @on-ok="rateOnOK"
        @on-cancel="rateOnCancel">
      <Rate v-model="package_rate" />
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
    name: 'UserQuery',
    components: {FilterTable, TableExpandRow},
    data () {
      return {
        total: 0,
        rawData: [],
        sizer: [1, 5, 10],
        pageNumber: 1,
        pageSize: 10,
        resultShow: false,
        phone: '',
        toRate: false,
        package_rate: 0,
        ratingTarget: '',
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
            key: 'rate',
            render: (h, params) => {
              return h('div', [
                h('Button', {
                  props: {
                    type: 'success',
                    disabled: params.row.status !== '已签收'
                  },
                  style: {
                    margin: '5px 5px 5px 5px'
                  },
                  on: {
                    click: async () => {
                      this.toRate = true
                      this.ratingTarget = params.row.package_id
                      await this.$http.post('http://127.0.0.1:3000/DispatchPair/Rate', {
                        package_id: params.row.package_id
                      })
                        .then(response => {
                          this.package_rate = response.data.rate
                        })
                    }
                  }
                }, '评价')
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
        const params = {
          phone: this.phone,
          payload: payload
        }
        await this.$http.post('http://127.0.0.1:3000/UserQuery/Query', params)
          .then(async response => {
            this.rawData = response.data
            for (const x of this.rawData) {
              x.sender_city = x.sender_city.join('/')
              x.receiver_city = x.receiver_city.join('/')
            }
          })
      },
      async userQuery () {
        this.resultShow = true
        this.generatePagedTableData()
        await this.$http.post('http://127.0.0.1:3000/UserQuery/Count', {
          phone: this.phone
        })
          .then(response => {
            this.total = response.data.count
          })
          .catch(() => {
            this.resultShow = false
          })
      },
      async rateOnOK () {
        await this.$http.post('http://127.0.0.1:3000/DispatchPair/ChangeRate', {
          package_id: this.ratingTarget,
          rate: this.package_rate
        }).then(response => {
          if (response.status === 200) {
            this.$Message.success('成功')
          } else {
            this.$Message.error('')
          }
        })
          .catch(() => {
            this.$Message.error('')
          })
      },
      rateOnCancel () {
        // do nothing
      }
    },
    mounted () {
      this.resultShow = false
    }
  }
</script>
