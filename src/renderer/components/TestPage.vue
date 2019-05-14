<template>
  <div>
    <h1>{{ msg }}</h1>
    <form>
      <input type="text" name="username" v-model="userName"> <br>
      <input type="text" name="age" v-model="age"> <br>
      <a href="javascript:;" @click="addUser">提交</a>
    </form>
  </div>
</template>

<script>
  import BookKeeping from './BookKeeping'
  import { API_URL } from '../../data/config'

  export default {
    name: 'TestPage',
    components: {BookKeeping},
    data () {
      return {
        msg: 'jxtxzzw',
        userName: '',
        age: ''
      }
    },
    methods: {
      addUser () {
        const name = this.userName
        const age = this.age
        this.$http.post(API_URL + '/user/addUser', {
          username: name,
          age: age
        }, {}).then((response) => {
          console.log(response)
        })
      }
    }
  }
</script>

<style scoped>

</style>
