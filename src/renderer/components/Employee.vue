<template>
  <div>
    <Card>
      <Form ref="formItem" :model="formItem" :rules="ruleValidation" :label-width="80">
        <FormItem label="员工工号" prop="uuid">
          <Input v-model="formItem.uuid" disabled readonly/>
        </FormItem>
        <FormItem label="姓名" prop="name">
          <Input v-model="formItem.name" placeholder="姓名"/>
        </FormItem>
        <FormItem label="电话" prop="phone">
          <Input v-model="formItem.phone" placeholder="电话"/>
        </FormItem>
        <FormItem label="邮箱" prop="email">
          <Input v-model="formItem.email" placeholder="邮箱"/>
        </FormItem>
        <FormItem label="出生年月" prop="birthday">
          <DatePicker v-model="formItem.birthday" type="date" placeholder="请选择日期" :options="birthdayTimeOption" />
        </FormItem>
        <FormItem label="月薪" prop="salary">
          <Input v-model="formItem.salary" placeholder="月薪"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
    </Card>
  </div>
</template>


<script>
  import router from '../router'
  export default {
    name: 'EmployeeModify',
    props: {
      formItem: {}
    },
    data () {
      const salaryValidator = (rule, value, callback) => {
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
      const phoneValidator = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('手机号是必填的'))
        } else if (value.toString().length !== 11) {
          callback(new Error('请输入正确的手机号'))
        }
      }
      const emailValidator = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱是必填的'))
        } else {
          await this.$http.post('http://127.0.0.1:3000/Employee/EmailUnique', {
            email: this.formItem.email
          })
            .then(response => {
              if (response.data.unique) {
                callback()
              } else {
                callback(new Error('邮箱已经存在'))
              }
            })
        }
      }
      return {
        birthdayTimeOption: {
          disabledDate (sendDate) {
            return sendDate > Date.now()
          }
        },
        ruleValidation: {
          name: [
            {required: true, trigger: 'blur'}
          ],
          salary: [
            {required: true, trigger: 'blur'},
            {validator: salaryValidator, trigger: 'blur'}
          ],
          phone: [
            {required: true, trigger: 'blur'},
            {validator: phoneValidator, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: emailValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      validate (data) {
        if (data.uuid === '系统将自动生成') {
          data.uuid = ''
        }
      },
      async postRequest () {
        this.validate(this.formItem)
        const _this = this
        await this.$http.post('http://127.0.0.1:3000/Employee/Add', this.formItem)
          .then(() => {
            _this.$Message.success('操作成功！')
            router.push('/EmployeeManage')
          })
          .catch((error) => {
            _this.$Modal.error({
              title: '操作失败',
              content: error.data
            })
          })
      }
    }
  }
</script>

<style scoped>

</style>
