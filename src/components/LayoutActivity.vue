<template>
  <KPage padding>
     <!-- Use default content slot -->
  </KPage>
</template>

<script>
import { Layout, mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'layout-activity',
  mixins: [mixins.baseActivity()],
  methods: {
    setMode (mode) {
      Layout.setMode(mode)
    }
  },
  mounted () {
    Layout.setFooter({ content: [{ component: 'layout/Footer' }] })
    this.setMode('page')
  },
  onBeforeUnmount () {
    Layout.setFooter({ content: null })
  }
}
</script>
