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
          package_id: '12dddss3',
          buttonPrompt: this.showPrompt()
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
        console.log('全部留空')
      } else {
        console.log('去后台拉数据')
      }
    }
  }
</script>

<style scoped>

</style>
