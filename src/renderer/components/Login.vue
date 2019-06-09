<template>
  <div>
    <Card>
      
      <div v-if="isLogin">
        <Alert type="success">
          您已经处于登录状态。
        </Alert>
        <Tabs value="changePasswordPane">
          <TabPane label='密码修改' name='changePasswordPane'>
            <div>
              <p>修改密码</p>
              <Form ref="changePasswordForm" :model="changePasswordForm" :rules="changePasswordValidator">
                <FormItem prop="oldPassword">
                  <Input type="password" v-model="changePasswordForm.oldPassword" placeholder="输入旧的密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="newPassword">
                  <Input type="password" v-model="changePasswordForm.newPassword" placeholder="设置新的密码">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem prop="rePassword">
                  <Input type="password" v-model="changePasswordForm.rePassword" placeholder="重复输入新的密码" @keyup.enter.native="handleChangePasswordSubmit('changePasswordForm')">
                    <Icon type="ios-lock-outline" slot="prepend"></Icon>
                  </Input>
                </FormItem>
                <FormItem>
                  <Button type="primary" @click="handleChangePasswordSubmit('changePasswordForm')">修改密码</Button>
                </FormItem>
              </Form>
            </div>
          </TabPane>
          <TabPane label='个人信息查看' name='forFuture'>
            <Alert show-icon>
              <template slot="desc">
                例如可以查看自己过去 6 个月的奖金，需要其他系统（例如财务系统）提供接口，此处不表
              </template>
            </Alert>
          </TabPane>
        </Tabs>
        <div>
          <Button @click="logout()" type="warning" long>
            注销
          </Button>
        </div>
      </div>
      <div v-else>
        <Form ref="loginForm" :model="loginForm" :rules="loginValidator">
          <FormItem prop="username">
            <Input type="text" v-model="loginForm.username" placeholder="用户名">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem prop="password">
            <Input type="password" v-model="loginForm.password" placeholder="密码" @keyup.enter.native="handleLoginSubmit('loginForm')">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </Input>
          </FormItem>
          <FormItem>
            <Button long type="primary" @click="handleLoginSubmit('loginForm')">登录</Button>
          </FormItem>
        </Form>
      </div>
    </Card>
  </div>
</template>
<script>
  import {md5, MD5_SUFFIX} from '../../server/router/salt'
  export default {
    name: 'Login',
    data () {
      const samePasswordValidator = (rule, value, callback) => {
        if (value.toString() !== this.changePasswordForm.newPassword.toString()) {
          callback(new Error('两次输入的密码不一致'))
        }
      }
      return {
        changePasswordForm: {
          oldPassword: '',
          newPassword: '',
          rePassword: ''
        },
        loginForm: {
          username: '',
          password: ''
        },
        loginValidator: {
          username: [
            { required: true, message: '请输入您的用户名', trigger: 'blur' }
          ],
          password: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
            { type: 'string', min: 1, message: '密码的最小长度是 6', trigger: 'blur' }
          ]
        },
        changePasswordValidator: {
          oldPassword: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
            { type: 'string', min: 1, message: '密码的最小长度是 6', trigger: 'blur' }
          ],
          newPassword: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
            { type: 'string', min: 1, message: '密码的最小长度是 6', trigger: 'blur' }
          ],
          rePassword: [
            { required: true, message: '请输入您的密码', trigger: 'blur' },
            { type: 'string', min: 1, message: '密码的最小长度是 6', trigger: 'blur' },
            { validator: samePasswordValidator, trigger: 'blur' }
          ]
        }
      }
    },
    methods: {
      async handleLoginSubmit (name) {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const params = {
              username: this.loginForm.username,
              password: MD5_SUFFIX.OUTER + md5(MD5_SUFFIX.INNER + this.loginForm.password)
            }
            console.log(params.password)
            const _this = this
            this.$http.post('http://127.0.0.1:3000/User/Login', params)
              .then(res => {
                if (res && res.status === 200) {
                  this.loginInteract(res.data.success)
                  this.$store.dispatch('login', res.data.token)
                } else {
                  this.loginInteract(false, '出现了意料之外的错误，请联系管理员！')
                }
              })
              .catch(function (response) {
                _this.loginInteract(false, response)
              })
          }
        })
      },
      async handleChangePasswordSubmit () {
        this.$refs[name].validate((valid) => {
          if (valid) {
            const params = {
              oldPassword: MD5_SUFFIX.OUTER + md5(MD5_SUFFIX.INNER + this.changePasswordForm.oldPassword),
              newPassword: MD5_SUFFIX.OUTER + md5(MD5_SUFFIX.INNER + this.changePasswordForm.newPassword)
            }
            const _this = this
            this.$http.post('http://127.0.0.1:3000/User/ChangePassword', params)
              .then(res => {
                if (res && res.status === 200) {
                  this.logout()
                } else {
                  this.loginInteract(false, '出现了意料之外的错误，请联系管理员！')
                }
              })
              .catch(function (response) {
                _this.loginInteract(false, response)
              })
          }
        })
      },
      logout () {
        this.$store.dispatch('logout')
      },
      loginInteract (success, content = '请检查用户名和密码是否正确！') {
        if (success) {
          this.$Message.success('登录成功')
        } else {
          this.$Modal.error({
            title: '登录失败！',
            content: content
          })
        }
      }
    },
    computed: {
      isLogin () {
        return this.$store.state.Auth.token !== ''
      }
    }
  }
</script>
