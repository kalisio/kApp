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
    Layout.setHeader({ content: [{ component: 'layout/Header' }] })
    Layout.setFooter({ content: [{ component: 'layout/Footer' }] })
  },
  onBeforeUnmount () {
    Layout.setHeader({ content: null })
    Layout.setFooter({ content: null })
  }
}
</script>
