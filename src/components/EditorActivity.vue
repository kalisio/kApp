<template>
  <k-page padding>
    <template v-slot:page-content>
      <router-view :router="getRouter()" />
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'kanban',
  mixins: [kCoreMixins.baseActivity()],
  methods: {
    getRouter () {
      return {
        onApply: { name: 'editor-activity' },
        onDismiss: { name: 'editor-activity' }
      }
    },
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    // Configure the activity
    this.configureActivity()
  }
}
</script>
