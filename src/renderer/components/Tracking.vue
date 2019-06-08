<template>
  <div>
    <div v-if="packageStatus === 'NOT FOUND'">
      <Alert type="error" show-icon>
        没有找到物流信息
        <span slot="desc">
          请您检查是否输入了正确的运单号
          <Button>
            重新输入（把这个功能添加过来，默认值是用户已经输入的，允许直接修改个别数字）
          </Button>
        </span>
      </Alert>
    </div>
    <Card v-else>
      <Steps :current="currentStep">
        <Step title="已揽件" content="您的快递已经揽收，即将开始运输"></Step>
        <Step title="运输中" content="正在运输中"></Step>
        <Step title="派件中" content="派件中，请保持电话畅通"></Step>
        <Step title="已签收" content="感谢您的使用"></Step>
      </Steps>
    </Card>
    <Card v-if="packageStatus !== 'NOT FOUND'">
      <Alert v-if="currentStep >= 2" show-icon>
        <template slot="desc">
          您的包裹由派件员 {{this.dispatcherInfo.name}} 派送<br/>
          联系电话 {{this.dispatcherInfo.phone}}<br/>
          该派件员平均得分 <Rate :value="this.dispatcherInfo.rate" disabled/>
        </template>
      </Alert>
      <Timeline v-if="rawData && rawData.length > 0">
        <TimelineItem v-for="item in rawData">
          <p class="time" :style="{'font-size': '14px', 'font-weight': 'bold'}">
            {{formDate(item.date)}}
          </p>
          <p class="content" :style="{'padding-left': '5px'}">
            从 {{item.WareHouse.warehouse_name}} {{item.action}}
          </p>
        </TimelineItem>
      </Timeline>
      <Alert v-else type="error" show-icon>
        <template slot="desc">
          没有查询到物流信息，可能您的包裹刚被揽收，暂时没有物流信息，请稍后查询。
        </template>
      </Alert>
    </Card>
  </div>
</template>
<script>
  export default {
    name: 'Tracking',
    props: {
      package_id: String
    },
    data () {
      return {
        packageStatus: '',
        rawData: [],
        currentStep: 0,
        currentStatus: '',
        dispatcherInfo: {}
      }
    },
    async mounted () {
      const packageID = this.package_id
      await this.$http.post('http://127.0.0.1:3000/Package/Tracking', {
        package_id: packageID
      })
        .then(async response => {
          this.packageStatus = response.data.status
          if (this.packageStatus === 'NOT FOUND') {
          } else {
            if (this.packageStatus === '已揽件') {
              this.currentStep = 0
            } else if (this.packageStatus === '运输中') {
              this.currentStep = 1
            } else if (this.packageStatus === '派件中') {
              this.currentStep = 2
            } else {
              this.currentStep = 3
            }
            if (this.currentStep === 3) {
              this.currentStatus = 'finish'
            } else {
              this.currentStatus = 'process'
            }
            this.rawData = response.data.tracking
          }
          await this.$http.post('http://127.0.0.1:3000/Dispatcher/Info', {
            package_id: this.package_id
          })
            .then(response => {
              this.dispatcherInfo = response.data
            })
        })
    },
    methods: {
      formDate (date) {
        const v = date.toString().split('T')[0].split('-')
        return v[0] + '年' + v[1] + '月' + v[2] + '日'
      }
    }
  }
</script>
