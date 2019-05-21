<template>
  <div>
    <Card>
      {{isLogin}}
      <div v-if="isLogin">
        <Alert type="success">
          欢迎你，工号 {{this.$store.state.Auth.user_id}}，您已经处于登录状态。
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
  import {md5, MD5_SUFFIX} from '../../server/router/constant'
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
              privilege: 'Login',
              username: this.loginForm.username,
              password: md5(MD5_SUFFIX + this.loginForm.password)
            }
            this.$http.post('http://127.0.0.1:3000/User/Login', params)
              .then(res => {
                if (res && res.status === 200) {
                  const success = res.data.success
                  this.loginInteract(success)
                  this.$store.dispatch('login', res.data.token)
                } else {
                  this.$Message.error('意料之外的错误！请于管理员联系！')
                }
              })
              .catch(function (response) {
                alert('意料之外的错误！请于管理员联系！')
                console.log(response)
              })
          }
        })
      },
      logout () {
        this.$store.dispatch('logout')
      },
      loginInteract (success) {
        if (success) {
          this.$Message.success('登录成功')
        } else {
          this.$Modal.error({
            title: '登录失败',
            content: '请检查您的用户名和密码'
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
