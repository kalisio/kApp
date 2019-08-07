<template>
  <div class="q-pa-sm">
    <k-modal ref="custommodal" :toolbar="toolbar" :title="$t('MainActivity.MODAL_TITLE')">
      <div slot="modal-content">
        <k-editor ref="customEditor" objectId="custom" service="custom" @applied="onObjectUpdated" />
       <!-- <k-viewer ref="customEditor" objectId="custom" service="custom" @applied="onObjectUpdated" />-->
      </div>
    </k-modal>

    <k-list v-if="mode==='list'" service="documents" :renderer="itemRenderer" :filter-query="searchQuery" />
    <k-grid v-else service="documents" :renderer="cardRenderer" :filter-query="searchQuery" />

    <k-modal-editor ref="editor" service="documents" :objectId="documentId" @applied="onDocumentCreated" />
  </div>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'
export default {
  name: 'main-activity',
  mixins: [
    kCoreMixins.baseActivity,
    kCoreMixins.schemaProxy
  ],
  inject: [ 'klayout' ],
  props: {
    mode: {
      type: String,
      required: true
    }
  },
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
      itemRenderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [{
              label: this.$i18n.t('MainActivity.EDIT_DOCUMENT'),
              icon: 'edit',
              handler: (document) => this.onEditDocument(document)
            },
            {
              label: this.$i18n.t('MainActivity.REMOVE_DOCUMENT'),
              icon: 'delete',
              handler: (document) => this.onDeleteDocument(document)
            }]
        }
      },
      cardRenderer: {
        component: 'collection/KCard',
        props: {
          itemActions: {
            pane: [{
              label: this.$i18n.t('MainActivity.EDIT_DOCUMENT'),
              icon: 'edit',
              handler: (document) => this.onEditDocument(document)
            }],
            menu: [{
              label: this.$i18n.t('MainActivity.REMOVE_DOCUMENT'),
              icon: 'delete',
              handler: (document) => this.onDeleteDocument(document)
            }]
          }
        }
      },
      documentId: null,
      schema: 'custom',
      toolbar: [{
        name: 'close',
        icon: 'close',
        handler: () => this.closeCustomModal()
      }]
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      // Title
      this.setTitle(this.$t('MainActivity.TITLE'))
      // Tabbar
      // Tabbar actions
      this.registerTabAction({
        name: 'list',
        label: this.$t('MainActivity.LIST_LABEL'),
        icon: 'menu',
        route: { name: 'main', params: { mode: 'list' } },
        default: this.mode === 'list'
      })
      this.registerTabAction({
        name: 'grid',
        label: this.$t('MainActivity.GRID_LABEL'),
        icon: 'apps',
        route: { name: 'main', params: { mode: 'grid' } },
        default: this.mode === 'grid'
      })
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
      }),
      this.registerFabAction({
        name: 'open-modal',
        label: this.$t('Object'),
        icon: 'close',
        handler: this.onOpenObject
      })
    },
    onOpenPanel () {
      this.klayout.toggleRightDrawer()
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
      // console.log("onEditDocument("+document._id+") triggered")
      this.documentId = document._id
      await this.$nextTick()
      this.$refs.editor.open()
    },
    async onOpenObject () {
      this.$refs.custommodal.open()
    },
    async onObjectUpdated (object) {
      this.$api.getService('custom').patch(0, { name: '' })
      this.$refs.custommodal.close()
    },
    closeCustomModal(){
      this.$refs.custommodal.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-list'] = this.$load('collection/KList')
    this.$options.components['k-grid'] = this.$load('collection/KGrid')
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
    this.$options.components['k-modal-document-editor'] = this.$load('KModalDocumentEditor')
    this.$options.components['k-modal'] = this.$load('frame/KModal')

    this.$options.components['k-editor'] = this.$load('editor/KEditor')
    this.$options.components['k-viewer'] = this.$load('KViewer')

    this.$events.$on('open-custom-editor', this.onOpenObject)
  },
  mounted () {
    // Initialize required DOM elements, etc.
  },
  beforeDestroy () {
    // Remove event listeners, etc.
    this.$events.$off('open-custom-editor', this.onOpenObject)
  }
}
</script>
