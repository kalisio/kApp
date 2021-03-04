<template>
  <k-page padding>
    <template v-slot:page-content>
      <router-view />
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'editor-activity',
  mixins: [kCoreMixins.baseActivity()],
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
  }
}
</script>
