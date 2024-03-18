<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <KDocument 
          url="sample.html"
          :localize="true"
        />     
      </div>
    </template>
  </KPage>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'document-activity',
  components: {},
  mixins: [mixins.baseActivity()]
}
</script>
