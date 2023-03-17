<template>
  <KPage>
    <template v-slot:page-content>
      <KStore />
    </template>
  </KPage>
</template>

<script>
import KStore from './KStore.vue'
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'store-activity',
  components: {
    KStore,
  },  
  mixins: [mixins.baseActivity('storeActivity')]
}
</script>