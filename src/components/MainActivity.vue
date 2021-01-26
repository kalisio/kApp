<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Item list rendering
      -->
      <k-list v-if="mode==='list'" service="documents" :renderer="itemRenderer" :filter-query="filterQuery" />
      <!--
        Card grid rendering
      -->
      <k-grid v-if="mode==='grid'" service="documents" :renderer="cardRenderer" :filter-query="filterQuery"  />
      <!--
        Card grid rendering
      -->
      <k-table v-if="mode==='table'" service="documents" :nb-items-per-page="2" :item-actions="tableActions" selection="multiple" :filter-query="filterQuery" />
      <!--
        Document editor
      -->
      <k-modal-editor ref="documentEditor" service="documents" :objectId="documentId" @applied="onDocumentCreated" />
      <!--
        Document editor
      -->
      <k-modaler ref="documentViewer" service="documents" :objectId="documentId" />
      <!--
        Custom editor
      -->
      <k-modal-editor ref="customEditor" service="custom" objectId="0" @applied="onCustomObjectUpdated" />
      <!--
        Custom viewer
      -->
      <k-modaler ref="customViewer" service="custom" objectId="0" />
    </template>
  </k-page>
</template>

<script>
import { utils as kCoreUtils, mixins as kCoreMixins } from '@kalisio/kdk/core.client'
export default {
  name: 'main-activity',
  mixins: [
    kCoreMixins.baseActivity
  ],
  props: {
    mode: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userName:  this.$store.get('user.name'),
      filterQuery: {},
      itemRenderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [
            { id: 'view-document', icon: 'las la-glasses', label: 'MainActivity.VIEW_DOCUMENT', handler: (document) => this.onViewDocument(document) },
            { id: 'edit-document', icon: 'las la-edit', label: 'MainActivity.EDIT_DOCUMENT', handler: (document) => this.onEditDocument(document) },
            { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
            { id: 'remove-document', icon: 'las la-trash', label: 'MainActivity.REMOVE_DOCUMENT', handler: (document) => this.onDeleteDocument(document) }
          ]
        }
      },
      cardRenderer: {
        component: 'collection/KCard',
        props: {
          itemActions: [
            { id: 'view-document', icon: 'las la-glasses', tooltip: 'MainActivity.VIEW_DOCUMENT', handler: (document) => this.onViewDocument(document) },
            { id: 'edit-document', icon: 'las la-edit', tooltip: 'MainActivity.EDIT_DOCUMENT', handler: (document) => this.onEditDocument(document) },
            { component: 'frame/KOverflowMenu', content: [
              { id: 'remove-document', icon: 'las la-trash', label: 'MainActivity.REMOVE_DOCUMENT', handler: (document) => this.onDeleteDocument(document) }
            ]}
          ]
        }
      },
      tableActions: [
        { id: 'view-document', icon: 'las la-glasses', label: 'MainActivity.VIEW_DOCUMENT', handler: (document) => this.onViewDocument(document) },
        { id: 'edit-document', icon: 'las la-edit', label: 'MainActivity.EDIT_DOCUMENT', handler: (document) => this.onEditDocument(document) },
        { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
        { id: 'remove-document', icon: 'las la-trash', label: 'MainActivity.REMOVE_DOCUMENT', handler: (document) => this.onDeleteDocument(document) }
      ],
      documentId: null
    }
  },
  watch: {
    mode: function () {
      this.setTopPaneMode(this.mode)
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      this.setTopPane({ 
          'list': [
            { id: 'list', icon: 'las la-list', label: 'MainActivity.LIST_LABEL', color: 'primary', status: () => { return 'disabled' } },
            { id: 'grid', icon: 'view_module', tooltip: 'MainActivity.GRID_LABEL', route: { name: 'main', params: { mode: 'grid' } } },
            { id: 'table', icon: 'las la-table', tooltip: 'MainActivity.TABLE_LABEL', route: { name: 'main', params: { mode: 'table' } } },
            { id: 'filter', icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'grid': [
            { id: 'list', icon: 'las la-list', tooltip:  'MainActivity.LIST_LABEL', route: { name: 'main', params: { mode: 'list' } } },
            { id: 'grid', icon: 'view_module', label: 'MainActivity.GRID_LABEL', color: 'primary', status: () => { return 'disabled' } },
            { id: 'table', icon: 'las la-table', tooltip: 'MainActivity.TABLE_LABEL', route: { name: 'main', params: { mode: 'table' } } },
            { id: 'filter', icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'table': [
            { id: 'list', icon: 'las la-list', tooltip:  'MainActivity.LIST_LABEL', route: { name: 'main', params: { mode: 'list' } } },
            { id: 'grid', icon: 'view_module', tooltip: 'MainActivity.GRID_LABEL', route: { name: 'main', params: { mode: 'grid' } } },
            { id: 'table', icon: 'las la-table', label: 'MainActivity.TABLE_LABEL', color: 'primary', status: () => { return 'disabled' } },
            { id: 'filter', icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'filter': [
            { id: 'back', icon: 'las la-arrow-left', handler: this.onFilterCanceled },
            { component: 'QSeparator', vertical: true,  color: 'lightgrey' },
            { component: 'collection/KFilter', value: this.filterQuery }
          ]
        }, this.mode)
      // Fab actions
      this.setFabActions([
        { id: 'create-document',  icon: 'las la-plus', label: 'MainActivity.CREATE_DOCUMENT', color: 'primary', handler: this.onCreateDocument },
        { id: 'minus',  icon: 'las la-minus', label: 'Minus', color: 'blue', handler: this.onCreateDocument },
        { id: 'eye',  icon: 'las la-eye', label: 'Eye', color: 'primary', handler: this.onCreateDocument },
        { id: 'tape',  icon: 'las la-tape', label: 'Measure tool', color: 'green', handler: this.onCreateDocument },
        { id: 'anchor',  icon: 'las la-anchor', label: 'Feu d\'habitation', color: 'primary', handler: this.onCreateDocument },
        { id: 'compass',  icon: 'las la-compass', label: 'Navigate', color: 'primary', handler: this.onCreateDocument },
        { id: 'eye2',  icon: 'las la-eye', label: 'Eye', color: 'primary', handler: this.onCreateDocument },
        { id: 'tape2',  icon: 'las la-tape', label: 'Measure tool', color: 'primary', handler: this.onCreateDocument },
        { id: 'anchor2',  icon: 'las la-anchor', label: 'Anchor', color: 'primary', handler: this.onCreateDocument, status: () => { return this.mode !== 'grid' ? 'hidden' : 'visible' } }
      ])
    },
    onFilterActivated () {
      this.setTopPaneMode('filter')
    },
    onFilterCanceled () {
      this.setTopPaneMode(this.mode)
    },
    onFilterChanged (filterQuery) {
      this.filterQuery = filterQuery
    },
    onOpenPanel () {
      this.$store.patch('rightDrawer', { visible: true })
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
    this.$options.components['k-modaler'] = this.$load('viewer/KModalViewer')
    // Listen to the nav links
    this.$events.$on('open-custom-editor', this.onOpenCustomEditor)
    this.$events.$on('open-custom-viewer', this.onOpenCustomViewer)
    this.$events.$on('filter-changed', this.onFilterChanged)
  },
  beforeDestroy () {
    // Remove event listeners, etc.
    this.$events.$off('open-custom-editor', this.onOpenCustomEditor)
    this.$events.$off('open-custom-viewer', this.onOpenCustomViewer)
    this.$events.$off('filter-changed', this.onFilterChanged)
  }
}
</script>
