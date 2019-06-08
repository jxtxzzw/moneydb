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
      }
    },
    async mounted () {
      if (this.$route.params.id === '0') {
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Max')
          .then(response => {
            this.formItem.warehouse_id = response.data.max + 1
            this.formItem.buttonPrompt = this.showPrompt()
          })
      } else {
        const params = {}
        params.warehouse_id = this.$route.params.id
        const payload = {
          where: params
        }
        await this.$http.post('http://127.0.0.1:3000/WareHouse/Query', payload)
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
