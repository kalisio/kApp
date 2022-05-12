<template>
  <k-page>
    <template v-slot:page-content>
      <div class="fixed-center text-h5">Layout</div>
    </template>
  </k-page>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'layout-activity',
  mixins: [mixins.baseActivity()]
}
</script>
