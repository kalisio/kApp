<template>
  <div class="full-width">
    <k-list service="documents" :renderer="renderer" :filter-query="searchQuery" />
    <k-modal-editor ref="editor" service="documents" @applied="onDocumentCreated" />
  </div>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'

export default {
  name: 'main-activity',
  mixins: [
    kCoreMixins.baseActivity
  ],
  inject: [ 'klayout' ],
  data () {
    return {
      renderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [{
            label: this.$i18n.t('MainActivity.REMOVE_DOCUMENT'),
            handler: (document) => this.onDeleteDocument(document)
          }]
        }
      }
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('MainPanel', this.$data)
      // Title
      this.setTitle(this.$t('MainActivity.TITLE'))
      // Search bar
      this.setSearchBar('profile.name')
      // Fab actions
      this.registerFabAction({
        name: 'open_panel',
        label: this.$t('MainActivity.PANEL'),
        icon: 'keyboard_arrow_right',
        handler: this.onOpenPanel
      })
      this.registerFabAction({
        name: 'create-document',
        label: this.$t('MainActivity.CREATE_DOCUMENT'),
        icon: 'add',
        handler: this.onCreateDocument
      })
    },
    onOpenPanel () {
      this.klayout.toggleRightDrawer()
    },
    onCreateDocument () {
      this.$refs.editor.open()
    },
    onDocumentCreated () {
      this.$refs.editor.close()
    },
    async onDeleteDocument (document) {
      await this.$api.getService('documents').remove(document._id)
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-list'] = this.$load('collection/KList')
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
  },
  mounted () {
    // Initialize required DOM elements, etc.
  },
  beforeDestroy () {
    // Remove event listenres, etc.
  }
}
</script>
