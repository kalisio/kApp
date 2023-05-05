<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <Stamps />
        <Shapes />
        <ColorScales />
        <Times />
      </div>
    </template>
  </KPage>
</template>

<script>
import Stamps from './Stamps.vue'
import Shapes from './Shapes.vue'
import ColorScales from './ColorScales.vue'
import Times from './Times.vue'
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'miscellaneous-activity',
  components: {
    Stamps,
    Shapes,
    ColorScales,
    Times,
  },  
  mixins: [mixins.baseActivity()]
}
</script>
