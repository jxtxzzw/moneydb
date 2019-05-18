<template>
  <Form ref="loginForm" :model="loginForm" :rules="loginValidator">
    <FormItem prop="username">
      <Input type="text" v-model="loginForm.username" placeholder="用户名">
        <Icon type="ios-person-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem prop="password">
      <Input type="password" v-model="loginForm.password" placeholder="密码">
        <Icon type="ios-lock-outline" slot="prepend"></Icon>
      </Input>
    </FormItem>
    <FormItem>
      <Button type="primary" @click="handleLoginSubmit('loginForm')">登录</Button>
    </FormItem>
  </Form>
</template>
<script>
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
            { type: 'string', min: 6, message: '密码的最小长度是 6', trigger: 'blur' }
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
              password: this.loginForm.password
            }
            this.$http.post('http://127.0.0.1:3000/auth', params)
              .then(res => {
                if (res && res.status === 200) {
                  this.$Message.success('假装登录成功')
                  this.$router.push('/PackageManage')
                } else {
                  this.$Message.error('假装登录失败')
                }
              })
              .catch(function (response) {
              })
          } else {
            this.$Message.error('请检查您的用户名和密码是否都填写完整！')
          }
        })
      }
    }
  }
</script>
