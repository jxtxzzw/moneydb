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
        <FormItem label="权限" prop="privileges">
          <CheckboxGroup v-model="formItem.privileges">
            <Checkbox label="人力资源权限"></Checkbox>
            <Checkbox label="前台接待权限"></Checkbox>
            <Checkbox label="运输权限"></Checkbox>
            <Checkbox label="派件权限"></Checkbox>
            <Checkbox label="仓储权限"></Checkbox>
          </CheckboxGroup>
        </FormItem>
        <FormItem label="月薪" prop="salary">
          <Input v-model="formItem.salary" placeholder="月薪"/>
        </FormItem>
        <FormItem>
          <Button type="primary" @click="postRequest('formItem')"> {{formItem.buttonPrompt}}</Button>
        </FormItem>
      </Form>
      <Button v-if="this.formItem.buttonPrompt === '修改'" type="warning" ghost @click="resetPassword">重置密码</Button>
    </Card>
  </div>
</template>


<script>
  import router from '../router'
  export default {
    inject: ['reload'],
    name: 'EmployeeModify',
    props: {
      formItem: {
        privileges: []
      }
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
        } else {
          callback()
        }
      }
      const emailValidator = async (rule, value, callback) => {
        if (value === '') {
          callback(new Error('邮箱是必填的'))
        } else {
          await this.$http.post('http://127.0.0.1:3000/Employee/EmailUnique', {
            email: this.formItem.email
          })
            .then(async response => {
              if (response.data.unique) {
                callback()
              } else {
                if (this.formItem.uuid === '系统将自动生成') {
                  callback(new Error('邮箱已经存在'))
                } else {
                  await this.$http.post('http://127.0.0.1:3000/User/Email', {
                    uuid: this.formItem.uuid
                  })
                    .then(email => {
                      if (email.data !== value) {
                        callback(new Error('已经有别人用了这个邮箱了！'))
                      } else {
                        callback()
                      }
                    })
                }
              }
            })
        }
      }
      const privilegeValidator = (rule, value, callback) => {
        if (value.length === 0) {
          callback(new Error('员工权限是必须的，会存在一个没有任何权限的员工吗？'))
        } else {
          callback()
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
            {validator: salaryValidator, trigger: 'blur'}
          ],
          phone: [
            {validator: phoneValidator, trigger: 'blur'}
          ],
          email: [
            {required: true, type: 'email', trigger: 'blur'},
            {validator: emailValidator, trigger: 'blur'}
          ],
          birthday: [
            {required: true}
          ],
          privileges: [
            {required: true},
            {validator: privilegeValidator, trigger: 'blur'}
          ]
        }
      }
    },
    methods: {
      async resetPassword () {
        const _this = this
        await this.$http.post('http://127.0.0.1:3000/User/ResetPassword', {
          uuid: this.formItem.uuid
        })
          .then(response => {
            if (response.status === 200) {
              this.$Modal.success({
                title: '密码重置成功',
                content: '重置后的密码已经发送到员工邮箱。（发邮件就不做了……）'
              })
            }
          })
          .catch(error => {
            _this.$Modal.error({
              title: '操作失败',
              content: error.data
            })
          })
      },
      trim (data) {
        if (data.uuid === '系统将自动生成') {
          data.uuid = ''
        }
      },
      async postRequest (name) {
        this.$refs[name].validate(async (valid) => {
          if (valid) {
            this.trim(this.formItem)
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
          } else {
          }
        })
      }
    }
  }
</script>

<style scoped>

</style>
