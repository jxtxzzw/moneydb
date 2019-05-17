<template>
  <div>
    <PackageManage/>
    <StaffManage/>
  </div>
</template>

<script>
  import BookKeeping from '../view/ManageMain'
  import { API_URL } from '../../data/config'
  import PackageManage from '../view/PackageManage'
  import StaffManage from '../view/StaffManage'

  export default {
    name: 'TestPage',
    components: {StaffManage, PackageManage, BookKeeping},
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
