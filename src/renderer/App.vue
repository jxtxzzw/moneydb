<template>
  <div id="app">
    <TestPage/>
    <router-view></router-view>
  </div>
</template>

<script>
  import TestPage from './components/TestPage'
  
  export default {
    name: 'moneydb',
    components: {TestPage}
  }
</script>

<style>
  /* CSS */
</style>
