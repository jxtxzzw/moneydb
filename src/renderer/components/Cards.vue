<template>
  <div>
    <Card :style="{'width': '350px'}">
      <p slot="title">
        {{ name }}
      </p>
      <p slot="extra">
        <Tag>
          {{ identifier }}
        </Tag>
      </p>
      余额： {{ balance }} {{ balanceType }}
    </Card>
  </div>
</template>

<script>
  export default {
    name: 'Cards',
    props: ['name', 'balance', 'identifier', 'balanceType']
  }
</script>

<style scoped>

</style>
