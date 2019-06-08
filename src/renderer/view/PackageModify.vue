<template>
  <div>
    <Package :formItem="formItem"/>
    <Card v-if="this.$route.params.id !== '0'">
      <TableExpandRow :package_id="this.$route.params.id"/>
    </Card>
  </div>
</template>

<script>
  import Package from '../components/Package'
  import TableExpandRow from '../components/TableExpandRow'
  export default {
    name: 'PackageModify',
    components: {TableExpandRow, Package},
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
        await this.$http.post('http://127.0.0.1:3000/Package/Max')
          .then(response => {
            this.formItem.package_id = response.data.max + 1
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
