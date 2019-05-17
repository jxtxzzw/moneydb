<template>
  <div>
    <Cards v-for="card in accounts"
           :name="card.name"
           :balance="card.balance"
           :identifier="card.identifier"
           balance-type="元"/>
  </div>
</template>

<script>
  import Cards from './Cards'
  
  export default {
    name: 'Accounts',
    components: {Cards},
    data () {
      return {
        accounts: [
          {
            name: '支付宝',
            balance: '120',
            identifier: '支付宝'
          },
          {
            name: '中国工商银行',
            balance: '100',
            identifier: '5132'
          }
        ]
      }
    }
  }
</script>

<style scoped>

</style>
