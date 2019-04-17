<template>
  <div>
    <Card style="width: 350px">
      <p slot="title">
        <Icon type="iso-film-outline" />
<!--        {{ card.name }}-->
<!--        {{ card.identify }}-->
        银行卡
        
      </p>

    </Card>
    <h1>Hello App!</h1>
    <p>
      <router-link to="/"> Home </router-link>
      <br/>
      <router-link to="/MockFilterTable">Go to MockFilterTable</router-link>
    </p>
    <router-view></router-view>
    
  </div>
</template>

<script>
  export default {
    name: 'TestPage'
  }
</script>

<style scoped>

</style>
