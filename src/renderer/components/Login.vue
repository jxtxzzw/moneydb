<template>
  <div>
    <Card>
      {{isLogin}}
      <div v-if="isLogin">
        <Alert type="success">
          欢迎你，工号 {{this.$store.state.Auth.user_id}}，您已经处于登录状态。
        </Alert>
        <Alert>
          <p>如果您有任何问题，请与管理员联系并提供您的 UUID：。
            请注意，您不应该向任何人透露任何其他信息（包括但不限于您的密码、手机）。
            UUID 具有全局唯一性，因此管理员的任何操作只需要……
          </p>
        </Alert>
        <p>其他信息</p>
        <p>诸如修改密码</p>
        <Button>
          查看
        </Button>
        <Button @click="logout()">
          注销
        </Button>
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
            <Button type="primary" @click="handleLoginSubmit('loginForm')">登录</Button>
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
      return {
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
            console.log(params)
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
