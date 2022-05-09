<template>
  <k-page>
    <template v-slot:page-content>
      <div class="fixed-center text-h5">Layout</div>
    </template>
  </k-page>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'
import { defineAsyncComponent } from 'vue'

export default {
  name: 'layout-activity',
  components: {
    KPage: defineAsyncComponent(() => import('@kalisio/kdk/core/client/components/layout/KPage.vue'))
  },
  mixins: [ mixins.baseActivity() ]
}
</script>