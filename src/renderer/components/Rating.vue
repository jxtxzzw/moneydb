<template>
  <div>
    <Rate v-model="value" />
  </div>
</template>
<script>
  export default {
    name: 'Rating',
    props: {
      id: 0,
      value: 0
    },
    methods: {
      async postRequest () {
        console.log('id=' + 0)
        console.log('rate=' + 0)
      }
    },
    mounted () {
    }
  }
</script>

<style scoped>

</style>
