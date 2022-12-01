<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <Stamps />
        <Shapes />
        <ColorScales />
      </div>
    </template>
  </KPage>
</template>

<script>
import Stamps from './Stamps.vue'
import Shapes from './Shapes.vue'
import ColorScales from './ColorScales.vue'
import { mixins } from '@kalisio/kdk/core.client'

export default {
  components: {
    Stamps,
    Shapes,
    ColorScales
  },  
  mixins: [mixins.baseActivity('miscellaneousActivity')]
}
</script>
