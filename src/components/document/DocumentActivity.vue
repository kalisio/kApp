<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <KDocument 
          :url="url"
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
  mixins: [mixins.baseActivity()],
  props: {
    type: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      url: undefined
    }
  },
  watch: {
    type: {
      handler (value) {
        this.setTopPaneMode(value)
        this.url = `sample.${value}`
      },
      immediate: true
    }
  }
}
</script>
