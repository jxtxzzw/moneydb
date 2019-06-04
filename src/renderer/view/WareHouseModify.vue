<template>
  <div>
    <WareHouse :formItem="formItem"/>
  </div>
</template>

<script>
  import WareHouse from '../components/WareHouse'
  export default {
    name: 'WareHouseModify',
    components: {WareHouse},
    data () {
      return {
        formItem: {
          warehouse_id: '0',
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
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Query')
          .then(response => {
            this.formItem.warehouse_id = (response.data[response.data.length - 1].warehouse_id + 1)
            this.formItem.buttonPrompt = this.showPrompt()
          })
      } else {
        const params = {}
        params.package_id = this.$route.params.id
        const payload = {
          where: params
        }
        await this.$http.post('http://127.0.0.1:3000/Package/Query', payload)
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
