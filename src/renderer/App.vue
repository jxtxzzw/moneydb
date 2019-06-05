<template>
  <!--  <div id="app">-->
  <MainLayout/>
  <!--    <router-view></router-view>-->
  <!--  </div>-->
</template>

<script>
  import MainLayout from './view/MainLayout'

  export default {
    name: 'moneydb',
    components: {MainLayout},
    provide () {
      return {
        reload: this.reload
      }
    },
    data () {
      return {
        isRouterAlive: true
      }
    },
    methods: {
      reload () {
        this.isRouterAlive = false
        this.$nextTick(function () {
          this.isRouterAlive = true
        })
      }
    }
  }
</script>

<style>
  /* CSS */
</style>
