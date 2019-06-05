<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="运单号" prop="package_id">
          <Input v-model="formItem.package_id" disabled readonly/>
        </FormItem>
        <FormItem label="寄件人姓名" prop="sender_name">
          <Input v-model="formItem.sender_name" placeholder="请输入寄件人姓名"/>
        </FormItem>
        <FormItem label="寄件人联系电话" prop="sender_phone">
          <Input v-model="formItem.sender_phone" placeholder="请输入寄件人联系电话"/>
        </FormItem>
        <FormItem label="寄件人城市" prop="sender_city">
          <Cascader v-model="formItem.sender_city" :data="city" change-on-select trigger="hover" filterable :load-data="loadCascadeCity" />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="寄件人地址" prop="sender_address">
          <Input v-model="formItem.sender_address" placeholder="请输入寄件人地址"/>
        </FormItem>
        <FormItem label="寄件日期" prop="send_date">
          <DatePicker v-model="formItem.send_date" type="date" placeholder="请选择日期" :options="sendTimeOption" @on-change="onSendTimeChange"/>
        </FormItem>
        <FormItem label="收件人姓名" prop="receiver_name">
          <Input v-model="formItem.receiver_name" placeholder="请输入收件人姓名"/>
        </FormItem>
        <FormItem label="收件人联系电话" prop="receiver_phone">
          <Input v-model="formItem.receiver_phone" placeholder="请输入收件人联系电话"/>
        </FormItem>
        <FormItem label="收件人城市" prop="receiver_city">
          <Cascader v-model="formItem.receiver_city" :data="city" change-on-select trigger="hover" filterable :load-data="loadCascadeCity" />
          <!--change-on-select 允许用户停止在任意一级，filterable 允许用户直接输入搜索任意一级的内容并快速选中-->
        </FormItem>
        <FormItem label="收件人地址" prop="receiver_address">
          <Input v-model="formItem.receiver_address" placeholder="请输入收件人地址"/>
        </FormItem>
        <FormItem label="运费" prop="price">
          <Input v-model="formItem.price" placeholder="请输入金额"/>
        </FormItem>
        <FormItem label="运费已付" prop="paid">
          <i-switch size="large" :true-value="true" :false-value="false" v-model="formItem.paid">
            <span slot="open">已付</span>
            <span slot="close">到付</span>
          </i-switch>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest('formItem')"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  import router from '../router'
  export default {
    name: 'PackageModify',
    props: {
      formItem: {}
    },
    data () {
      const priceValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入金额'))
        } else {
          const s = value.toString()
          for (let i = 0; i < s.length; i++) {
            if (s.charAt(i) !== '.' && (s.charAt(i) < '0' || s.charAt(i) > '9')) {
              callback(new Error('不能输入 0-9 和小数点以外的任何字符'))
            }
          }
          const v = parseFloat(s)
          if (v > 0) {
            callback()
          } else {
            callback(new Error('请输入正确的金额'))
          }
        }
      }
      const addressValidator = (rule, value, callback) => {
        if (value.toString().length > 4096) {
          callback(new Error('更新说明不能多于 4096 个字'))
        } else if (value.toString().length < 10) {
          callback(new Error('地址不能少于 10 个字'))
        } else {
          callback()
        }
      }
      const phoneValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号是必填的'))
        } else if (value.toString().length !== 11) {
          callback(new Error('请输入正确的手机号'))
        } else {
          callback()
        }
      }
      const cityValidator = (rule, value, callback) => {
        if (value.length > 0) {
          callback()
        } else {
          callback(new Error('城市是必填项'))
        }
      }
      return {
        sendTimeOption: {
          disabledDate (sendDate) {
            return sendDate > Date.now()
          }
        },
        receiveTimeOption: {
          disabledDate (sendDate) {
            return sendDate > Date.now()
          }
        },
        ruleValidation: {
          sender_name: [
            {required: true, trigger: 'blur'}
          ],
          receiver_name: [
            {required: true, trigger: 'blur'}
          ],
          sender_city: [
            {required: true},
            {validator: cityValidator}
          ],
          receiver_city: [
            {required: true},
            {validator: cityValidator}
          ],
          price: [
            {required: true, trigger: 'blur'},
            {validator: priceValidator, trigger: 'blur'}
          ],
          send_date: [
            {required: true}
          ],
          sender_address: [
            {required: true, trigger: 'blur'},
            {validator: addressValidator, trigger: 'blur'}
          ],
          receiver_address: [
            {required: true, trigger: 'blur'},
            {validator: addressValidator, trigger: 'blur'}
          ],
          receiver_phone: [
            {required: true, trigger: 'blur'},
            {validator: phoneValidator, trigger: 'blur'}
          ],
          sender_phone: [
            {required: true, trigger: 'blur'},
            {validator: phoneValidator, trigger: 'blur'}
          ]
        },
        city: []
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
          .then(async response => {
            if (response) {
              const data = response.data
              for (const x of data) {
                array.push({
                  value: x.location,
                  label: x.location,
                  children: []
                })
              }
              for (const x of array) {
                await this.getCityData(x.children, x.value)
              }
            }
          })
      },
      trim (data) {
        if (data.receive_date === '') {
          data.receive_date = null
        }
      },
      async postRequest (name) {
        this.trim(this.formItem)
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            const _this = this
            await this.$http.post('http://127.0.0.1:3000/Package/Add', this.formItem)
              .then(() => {
                _this.$Message.success('操作成功！')
                router.push('/PackageManage')
              })
              .catch((error) => {
                _this.$Modal.error({
                  title: '操作失败',
                  content: error.data
                })
              })
          }
        })
      },
      /**
       * 开始时间发生变化时触发,设置结束时间不可选择的日期
       * 结束时间应大于等于开始时间,且小于等于当前时间
       * @param {string} sendDate 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onSendTimeChange (sendDate, type) {
        this.receiveTimeOption = {
          disabledDate (receiveDate) {
            return receiveDate < new Date(sendDate) || receiveDate > Date.now()
          }
        }
      },
      /**
       * 结束时间发生变化时触发,设置开始时间不可选择的日期
       * 开始时间小于等于结束时间,且小于等于当前时间
       * @param {string} receiveDate 格式化后的日期
       * @param {string} type 当前的日期类型
       */
      onReceiveTimeChange (receiveDate, type) {
        this.sendTimeOption = {
          disabledDate (sendDate) {
            return sendDate > new Date(receiveDate) || sendDate > Date.now()
          }
        }
      }
    },
    async mounted () {
      await this.getCityData(this.city)
    }
  }
</script>

<style scoped>

</style>
