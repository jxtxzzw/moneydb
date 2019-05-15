<template>
  <Form ref="loginForm" :model="loginForm" :rules="loginValidator">
    <FormItem prop="user">
      <Input type="text" v-model="loginForm.user" placeholder="用户名">
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
          user: '',
          password: ''
        },
        loginValidator: {
          user: [
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
              user: this.user,
              password: this.password
              // 注意今后需要加入 MD5 加密后传输
            }
            this.$http.post('http://127.0.0.1:3000/profile', params)
              .then(res => {
                console.log(res.data) // 是data
                console.log(res.status)
                this.$Message.success('假装登录成功')
              })
              .catch(function (response) {
                console.log(response)
              })
          } else {
            this.$Message.error('请检查您的用户名和密码是否都填写完整！')
          }
        })
      }
    }
  }
</script>
