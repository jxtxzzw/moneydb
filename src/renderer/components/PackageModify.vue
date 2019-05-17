<template>
  <Button>
    {{ id }}
  </Button>
</template>

<script>
  export default {
    name: 'PackageModify',
    data () {
      return {
        id: this.$route.params.id
      }
    }
  }
</script>

<style scoped>

</style>
