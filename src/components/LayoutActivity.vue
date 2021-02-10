<template>
  <k-page>
    <div>
      Layout
    </div>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'layout',
  mixins: [kCoreMixins.baseActivity()],
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
  }
}
</script>