<template>
  <div>
    <Card>
      <Form ref="formData" :model="formData" :rules="ruleValidation" :label-width="80">
        <FormItem label="运单号" prop="package_id">
          <Input v-model="formData.package_id" disabled readonly/>
        </FormItem>
        <FormItem label="寄件人姓名" prop="sender_name">
          <Input v-model="formData.sender_name" placeholder="请输入寄件人姓名"/>
        </FormItem>
        <FormItem label="寄件人联系电话" prop="sender_phone">
          <Input v-model="formData.sender_phone" placeholder="请输入寄件人联系电话"/>
        </FormItem>
        <FormItem label="寄件人城市" prop="sender_city">
          <Cascader v-model="formData.sender_city" :data="city" change-on-select trigger="hover" filterable :load-data="loadCascadeCity" />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="寄件人地址" prop="sender_address">
          <Input v-model="formData.sender_address" placeholder="请输入寄件人地址"/>
        </FormItem>
        <FormItem label="寄件日期" prop="send_date">
          <DatePicker v-model="formData.send_date" type="date" placeholder="请选择日期"/>
        </FormItem>
        <FormItem label="收件人姓名" prop="receiver_name">
          <Input v-model="formData.receiver_name" placeholder="请输入收件人姓名"/>
        </FormItem>
        <FormItem label="收件人联系电话" prop="receiver_phone">
          <Input v-model="formData.receiver_phone" placeholder="请输入收件人联系电话"/>
        </FormItem>
        <FormItem label="收件人城市" prop="receiver_city">
          <Cascader v-model="formData.receiver_city" :data="city" change-on-select trigger="hover" filterable :load-data="loadCascadeCity" />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="收件人地址" prop="receiver_address">
          <Input v-model="formData.receiver_address" placeholder="请输入收件人地址"/>
        </FormItem>
        <FormItem label="收件日期" prop="receive_date">
          <DatePicker v-model="formData.receive_date" type="date" placeholder="请选择日期"/>
        </FormItem>
        <FormItem label="运费" prop="price">
          <Input v-model="formData.price" placeholder="请输入金额"/>
        </FormItem>
        <FormItem label="运费已付" prop="paid">
          <i-switch size="large" true-value="true" false-value="false" v-model="formData.paid">
            <span slot="open">已付</span>
            <span slot="close">到付</span>
          </i-switch>
        </FormItem>
<!--        <FormItem label="物流" prop="info">-->
<!--          <router-link :to="getTracking">-->
<!--            <Button>-->
<!--              查看物流-->
<!--            </Button>-->
<!--          </router-link>-->
<!--        </FormItem>-->
<!--        <FormItem label="物流" prop="description">-->
<!--          <Input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}" placeholder="如果有什么想说的……"/>-->
<!--        </FormItem>-->
        <FormItem>
          <Button type="primary" @click="postRequest"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  export default {
    name: 'Expenditure',
    props: {
      formItem: {}
    },
    data () {
      const priceValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入金额'))
        } else {
          let v = parseFloat(value.toString())
          if (v > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的金额'))
          }
        }
      }
      const descriptionValidator = (rule, value, callback) => {
        if (value.toString().length > 4096) {
          callback(new Error('更新说明不能多于 4096 个字'))
        } else {
          callback()
        }
      }
      return {
        ruleValidation: {
          price: [
            {required: true, message: '请输入金额', trigger: 'blur'},
            {validator: priceValidator, trigger: 'blur'}
          ],
          description: [
            {required: false},
            {validator: descriptionValidator, trigger: 'blur'}
          ]
        },
        city: [],
        formData: {}
      }
    },
    methods: {
      async loadCascadeCity (item, callback) {
        item.loading = true
        await this.getCityData(item.children, item.value)
        item.loading = false
        callback()
      },
      async getCityData (array, father = null) {
        await this.$http.post('http://127.0.0.1:3000/Location/Query', {
          father: father
        })
          .then(response => {
            const data = response.data
            for (const x of data) {
              array.push({
                value: x.location,
                label: x.location,
                children: []
              })
              
            }
          })
        for (const x of array) {
          await this.$http.post('http://127.0.0.1:3000/Location/Query', {
            father: x.value
          })
            .then(response => {
              const data = response.data
              if (data.length > 0) {
                x.loading = false
              }
            })
        }
      },
      async postRequest () {
        const _this = this
        await this.$http.post('http://127.0.0.1:3000/Package/Add', this.formData)
          .then(() => {
            _this.$Message.success('操作成功！')
            _this.router.push('/PackageManage')
          })
          .catch(() => {
            _this.$Modal.error({
              title: '操作失败'
            })
          })
      }
    },
    async mounted () {
      await this.getCityData(this.city)
      this.formData = this.formItem
    },
    computed: {
      getTracking () {
        return '/PackageModify/' + this.formItem.package_id
      }
    }
  }
</script>

<style scoped>

</style>
