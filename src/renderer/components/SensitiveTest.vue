<template>
  <div>
    <Button @click="getTest">敏感接口</Button>
    {{result}}
    <Profile></Profile>
  </div>
</template>

<script>
  import Profile from './Profile'
  export default {
    name: 'sensitive',
    components: {
      Profile
    },
    data () {
      return {
        result: ''
      }
    },
    methods: {
      // 请求敏感接口
      async getTest () {
        this.result = await this.$http.get('http://127.0.0.1:3000/auth').then(res => res)
      }
    }
  }
</script>
