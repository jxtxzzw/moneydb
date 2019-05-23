<style scoped>
  .expand-row{
    margin-bottom: 16px;
  }
</style>
<template>
  <div>
    <Row class="expand-row">
        <span class="expand-key">物流信息: </span>
        <span class="expand-value">
          <Tracking :package_id="package_id"/>
        </span>
    </Row>
  </div>
</template>
<script>
  import Tracking from './Tracking'
  export default {
    name: 'TableExpandRow',
    components: {Tracking},
    props: {
      package_id: String
    }
  }
</script>
