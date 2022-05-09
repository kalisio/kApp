<template>
  <k-page padding>
    <template v-slot:page-content>
      <router-view />
    </template>
  </k-page>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'
const { baseActivity } = mixins

export default {
  name: 'editor-activity',
  mixins: [baseActivity()],
  beforeCreate () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
  }
}
</script>
