<template>
  <k-page>
    <template v-slot:page-content>
      <div class="fixed-center text-h5">Layout</div>
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'layout-activity',
  mixins: [kCoreMixins.baseActivity()],
  beforeCreate () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
  }
}
</script>