<template>
  <k-links-panel name="panel" />
</template>

<script>

export default {
  name: 'main-panel',
  created () {
    // Load the require components
    this.$options.components['k-links-panel'] = this.$load('layout/KLinksPanel')
  }
}
</script>

