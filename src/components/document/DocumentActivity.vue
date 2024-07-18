<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <KDocument 
          class="q-pa-sm col-sm-10 col-md-8 col-lg-6 bg-white"
          :url="url"
          :localize="true"
          style="max-height: calc(100vh - 75px);"
        />     
      </div>
    </template>
  </KPage>
</template>

<script>
import { mixins, Layout } from '@kalisio/kdk/core.client'

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
      url: undefined,
      ready: false
    }
  },
  watch: {
    type: {
      handler (value) {
        Layout.setPaneMode('top', value)
        this.url = `sample.${value}`
      }
    }
  },
  async mounted () {
    // FIXME: wait for the top pane is mounted otherwise the setPaneMode won't work
    await this.$nextTick()
    await this.$nextTick()
    this.url = `sample.${this.type}`
    Layout.setPaneMode('top', this.type)
  }
}
</script>
