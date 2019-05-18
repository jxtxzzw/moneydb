<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
        <span class="expand-key">Job: </span>
        <span class="expand-value">{{ v }}</span>
    </Row>
  </div>
</template>
<script>
  export default {
    name: 'TableExpandRow',
    props: {
      row: Object
    },
    data () {
      return {
        v: '111111111111111111111111'
      }
    }
  }
</script>
