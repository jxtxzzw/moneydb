<template>
  <div>
    <Package :formItem="formItem"/>
  </div>
</template>

<script>
  import Package from '../components/Package'
  export default {
    name: 'PackageModify',
    components: {Package},
    data () {
      return {
        formItem: {
          package_id: '0',
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
      },
      submit () {
        console.log()
      }
    },
    async mounted () {
      console.log(this.$route.params.id)
      if (this.$route.params.id === '0') {
        console.log('aa')
        await this.$http.post('http://127.0.0.1:3000/Package/Query')
          .then(response => {
            this.formItem.package_id = response.data.length + 1
            this.formItem.buttonPrompt = this.showPrompt()
          })
      } else {
        const params = {}
        params.package_id = this.$route.params.id
        await this.$http.post('http://127.0.0.1:3000/Package/Query', params)
          .then(response => {
            this.formItem = response.data[0]
            this.formItem.buttonPrompt = this.showPrompt()
          })
      }
    }
  }
</script>

<style scoped>

</style>
