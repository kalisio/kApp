<template>
  <div>
    <h1 class="text-center">{{ text }}</h1>
    <q-btn class="fixed" style="right: 20px; top: 70px" small round icon="layers" color="secondary" @click="layout.toggleRight()" />
  </div>
</template>

<script>

import { QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'

export default {
  name: 'main-activity',
  components: {
    QBtn
  },
  mixins: [
    kCoreMixins.baseActivity
  ],
  inject: [ 'layout' ],
  data () {
    return {
      toggled: false
    }
  },
  computed: {
    text() {
      return (this.toggled ? this.$t('MainActivity.UNTOGGLE') :  this.$t('MainActivity.TOGGLE'))
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('MainPanel', this.$data)
      // Title
      this.setTitle(this.$t('MainActivity.TITLE'))
      // Fab actions
      this.registerFabAction({
        name: 'action',
        label: this.$t('MainActivity.ACTION'),
        icon: 'refresh',
        handler: this.onAction
      })
    },
    onAction () {
      this.toggled = !this.toggled
    }
  },
  created () {
    // Initialize event listeners, internal data, etc.
  },
  mounted () {
    // Initialize required DOM elements, etc.
  },
  beforeDestroy () {
    // Remove event listenres, etc.
  }
}
</script>
