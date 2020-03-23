<template>
  <k-page padding>
    <div slot="page-content" >
      <!--
        Item list rendering
      -->
      <k-list v-if="mode==='list'" service="documents" :renderer="itemRenderer" :filter-query="searchQuery" />
      <!--
        Card grid rendering
      -->
      <k-grid v-if="mode==='grid'" service="documents" :renderer="cardRenderer" :filter-query="searchQuery" />
      <!--
        Card grid rendering
      -->
      <k-table v-if="mode==='table'" service="documents" :nb-items-per-page="2" :item-actions="tableActions" selection="multiple" :filter-query="searchQuery" />
      <!--
        Document editor
      -->
      <k-modal-editor ref="documentEditor" service="documents" :objectId="documentId" @applied="onDocumentCreated" />
      <!--
        Document editor
      -->
      <k-modal-viewer ref="documentViewer" service="documents" :objectId="documentId" />
      <!--
        Custom editor
      -->
      <k-modal-editor ref="customEditor" service="custom" objectId="0" @applied="onCustomObjectUpdated" />
      <!--
        Custom viewer
      -->
      <k-modal-viewer ref="customViewer" service="custom" objectId="0" />
    </div>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
export default {
  name: 'main-activity',
  mixins: [
    kCoreMixins.baseActivity
  ],
  inject: ['klayout'],
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      itemRenderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [{
            label: this.$i18n.t('MainActivity.VIEW_DOCUMENT'),
            icon: 'description',
            handler: (document) => this.onViewDocument(document)
          },
          {
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
              label: this.$i18n.t('MainActivity.VIEW_DOCUMENT'),
              icon: 'description',
              handler: (document) => this.onViewDocument(document)
            },
            {
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
      tableActions: [{
        label: this.$i18n.t('MainActivity.VIEW_DOCUMENT'),
        icon: 'description',
        handler: (document) => this.onViewDocument(document)
      },
      {
        label: this.$i18n.t('MainActivity.EDIT_DOCUMENT'),
        icon: 'edit',
        handler: (document) => this.onEditDocument(document)
      },
      {
        label: this.$i18n.t('MainActivity.REMOVE_DOCUMENT'),
        icon: 'delete',
        handler: (document) => this.onDeleteDocument(document)
      }],
      documentId: null
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      // Title
      this.setTitle(this.$t('MainActivity.TITLE'))
      // Tabbar
      this.registerTabAction({
        name: 'list',
        label: this.$t('MainActivity.LIST_LABEL'),
        icon: 'view_list',
        route: { name: 'main', params: { mode: 'list' } },
        default: this.mode === 'list'
      })
      this.registerTabAction({
        name: 'grid',
        label: this.$t('MainActivity.GRID_LABEL'),
        icon: 'view_module',
        route: { name: 'main', params: { mode: 'grid' } },
        default: this.mode === 'grid'
      })
      this.registerTabAction({
        name: 'table',
        label: this.$t('MainActivity.TABLE_LABEL'),
        icon: 'view_headline',
        route: { name: 'main', params: { mode: 'table' } },
        default: this.mode === 'table'
      })
      // Search bar
      this.setSearchBar('name')
      // Fab actions
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
    async onCreateDocument () {
      this.documentId = null
      await this.$nextTick()
      this.$refs.documentEditor.open()
    },
    onDocumentCreated () {
      this.$refs.documentEditor.close()
    },
    async onDeleteDocument (document) {
      await this.$api.getService('documents').remove(document._id)
    },
    async onViewDocument (document) {
      this.documentId = document._id
      await this.$nextTick()
      this.$refs.documentViewer.open()
    },
    async onEditDocument (document) {
      this.documentId = document._id
      await this.$nextTick()
      this.$refs.documentEditor.open()
    },
    onOpenCustomEditor () {
      this.$refs.customEditor.open()
    },
    onOpenCustomViewer () {
      this.$refs.customViewer.open()
    },
    async onCustomObjectUpdated (object) {
      await this.$api.getService('custom').patch(0, { name: '' })
      this.$refs.customEditor.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-list'] = this.$load('collection/KList')
    this.$options.components['k-grid'] = this.$load('collection/KGrid')
    this.$options.components['k-table'] = this.$load('collection/KTable')
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
    this.$options.components['k-modal-viewer'] = this.$load('viewer/KModalViewer')
    // Listen to the nav links
    this.$events.$on('open-custom-editor', this.onOpenCustomEditor)
    this.$events.$on('open-custom-viewer', this.onOpenCustomViewer)
  },
  mounted () {
    // Initialize required DOM elements, etc.
    this.$store.patch('appBar', {
      toolbar: [] /*{
        name: 'open_panel',
        label: this.$t('MainActivity.PANEL'),
        icon: 'chrome_reader_mode',
        handler: this.onOpenPanel
      }],*/,
      menu: []
    })
  },
  beforeDestroy () {
    // Remove event listeners, etc.
    this.$events.$off('open-custom-editor', this.onOpenCustomEditor)
    this.$events.$off('open-custom-viewer', this.onOpenCustomViewer)
  }
}
</script>
