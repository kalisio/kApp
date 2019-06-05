<template>
  <div>
    <k-modal ref="custommodal" :toolbar="toolbar" :title="$t('MainActivity.MODAL_TITLE')">
      <div slot="modal-content">
        <div>{{savedData}}</div>
        <k-editor ref="customEditor" objectId="custom" service="custom" @applied="onObjectUpdated" />
      </div>
    </k-modal>
    
    <k-list service="documents" :renderer="renderer" :filter-query="searchQuery" />
    <k-modal-editor ref="editor" service="documents" :objectId="documentId" @applied="onDocumentCreated" />
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
    kCoreMixins.baseActivity,
    kCoreMixins.schemaProxy
  ],
  inject: [ 'layout' ],
  computed: {
    buttons () {
      let buttons = [
        { name: 'apply-button', label: this.applyButton, color: 'primary', handler: (event, done) => this.apply(event, done) }
      ]
      if (this.clearButton !== '') {
        buttons.push({
          name: 'clear-button', label: this.clearButton, color: 'primary', handler: (event, done) => this.clear(event, done)
        })
      }
      if (this.resetButton !== '') {
        buttons.push({
          name: 'reset-button', label: this.resetButton, color: 'primary', handler: (event, done) => this.reset(event, done)
        })
      }
      return buttons
    }
  },
  data () {
    return {
      renderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [{
            label: this.$i18n.t('MainActivity.REMOVE_DOCUMENT'),
            handler: (document) => this.onDeleteDocument(document)
          },
          {
            label: this.$i18n.t('MainActivity.EDIT_DOCUMENT'),
            handler: (document) => this.onEditDocument(document)
          }]
        }
      },
      documentId: null,
      schema: 'custom',
      toolbar: [{
        name: 'close',
        icon: 'close',
        handler: () => this.closeCustomModal()
      }],
      savedData: this.$api.getService('custom').get("id")
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
      }),
      this.registerFabAction({
        name: 'create-document',
        label: this.$t('MainActivity.CREATE_DOCUMENT'),
        icon: 'add',
        handler: this.onCreateDocument
      }),
      this.registerFabAction({
        name: 'open-modal',
        label: this.$t('Object'),
        icon: 'close',
        handler: this.onOpenObject
      })
    },
    onOpenPanel () {
      this.layout.toggleRight()
    },
    async onCreateDocument () {
      this.documentId = null
      await this.$nextTick()
      this.$refs.editor.open()
    },
    onDocumentCreated () {
      this.$refs.editor.close()
    },
    async onDeleteDocument (document) {
      await this.$api.getService('documents').remove(document._id)
    },
    async onEditDocument (document) { 
      console.log("onEditDocument("+document._id+") trigered")
      this.documentId = document._id
      await this.$nextTick()
      this.$refs.editor.open()
    },
    async onOpenObject () {
      this.$refs.custommodal.open()
    },
    async onObjectUpdated (object) {
      console.log('Object updated: ', object)
    },
    closeCustomModal(){
      this.$refs.custommodal.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-list'] = this.$load('collection/KList')
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
    this.$options.components['k-modal-document-editor'] = this.$load('KModalDocumentEditor')
    this.$options.components['k-modal'] = this.$load('frame/KModal')

    this.$options.components['k-editor'] = this.$load('editor/KEditor')

  },
  mounted () {
    // Initialize required DOM elements, etc.
  },
  beforeDestroy () {
    // Remove event listenres, etc.
  }
}
</script>
