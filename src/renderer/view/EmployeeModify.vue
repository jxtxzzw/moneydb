<template>
  <div>
    <Employee :formItem="formItem"/>
  </div>
</template>

<script>
  import Employee from '../components/Employee'

  export default {
    name: 'EmployeeModify',
    components: {Employee},
    data () {
      return {
        formItem: {
          package_id: 0,
          buttonPrompt: '新增'
        }
      }
    },
    methods: {
      showPrompt () {
        if (this.$route.params.id === '0') {
          return '新增'
        } else {
          return '修改'
        }
      }
    },
    async mounted () {
      if (this.$route.params.id === '0') {
        this.formItem.uuid = '系统将自动生成'
        this.formItem.buttonPrompt = this.showPrompt()
      } else {
        const params = {}
        params.uuid = this.$route.params.id
        const payload = {
          where: params
        }
        await this.$http.post('http://127.0.0.1:3000/Employee/Query', payload)
          .then(async response => {
            await this.$http.post('http://127.0.0.1:3000/Employee/Privilege', {
              uuid: response.data[0].uuid
            })
              .then(async privilege => {
                await this.$http.post('http://127.0.0.1:3000/User/Email', {
                  uuid: response.data[0].uuid
                }).then(email => {
                  this.formItem = response.data[0]
                  this.formItem.privileges = privilege.data
                  this.formItem.email = email.data
                  this.formItem.buttonPrompt = this.showPrompt()
                })
              })
          })
      }
    }
  }
</script>

<style scoped>

</style>
