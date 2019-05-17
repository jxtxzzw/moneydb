<template>
  <Tabs value="name1">
    <TabPane label="支出" name="expenditure">
      <Expenditure/>
    </TabPane>
    <TabPane label="收入" name="income">收入</TabPane>
    <TabPane label="转账" name="transfer">转账</TabPane>
    <TabPane label="借贷" name="loan">借贷</TabPane>
  </Tabs>
</template>
<script>
  import Expenditure from '../components/Expenditure'
  export default {
    name: 'BookKeeping',
    components: {Expenditure}
  }
</script>
