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
      <k-modal-viewer ref="documentViewer" service="documents" :objectId="documentId" />
      <!--
        Custom editor
      -->
      <k-modal-editor ref="customEditor" service="custom" objectId="0" @applied="onCustomObjectUpdated" />
      <!--
        Custom viewer
      -->
      <k-modal-viewer ref="customViewer" service="custom" objectId="0" />
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
          itemActions: [{
            label: this.$i18n.t('MainActivity.VIEW_DOCUMENT'),
            icon: 'las la-file-alt',
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
              icon: 'las la-file-alt',
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
        icon: 'las la-file-alt',
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
  watch: {
    mode: function () {
      this.setActivityBarMode(this.mode)
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      this.setActivityBar({ 
          'list': [
            { component: 'QChip', label: kCoreUtils.getInitials(this.userName), color: 'grey-8', textColor: 'white' },
            { component: 'QSeparator', vertical: true, inset: true },
            { icon: 'view_module', label: this.$t('MainActivity.GRID_LABEL'), handler: { name: 'main', params: { mode: 'grid' } } },
            { icon: 'las la-table', label: this.$t('MainActivity.TABLE_LABEL'), handler: { name: 'main', params: { mode: 'table' } } },
            { icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'grid': [
            { component: 'QChip', label: kCoreUtils.getInitials(this.userName), color: 'grey-8', textColor: 'white' },
            { component: 'QSeparator', vertical: true, inset: true },
            { icon: 'las la-list', label:  this.$t('MainActivity.LIST_LABEL'), handler: { name: 'main', params: { mode: 'list' } } },
            { icon: 'las la-table', label: this.$t('MainActivity.TABLE_LABEL'), handler: { name: 'main', params: { mode: 'table' } } },
            { icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'table': [
            { component: 'QChip', label: kCoreUtils.getInitials(this.userName), color: 'grey-8', textColor: 'white' },
            { component: 'QSeparator', vertical: true, inset: true },
            { icon: 'las la-list', label:  this.$t('MainActivity.LIST_LABEL'), handler: { name: 'main', params: { mode: 'list' } } },
            { icon: 'view_module', label: this.$t('MainActivity.GRID_LABEL'), handler: { name: 'main', params: { mode: 'grid' } } },
            { icon: 'las la-search', tooltip: 'Search', handler: this.onFilterActivated }
          ],
          'filter': [
            { icon: 'las la-arrow-left', handler: this.onFilterCanceled },
            { component: 'QSeparator', vertical: true, inset: true },
            { component: 'collection/KFilter', value: this.filterQuery }
          ]
        }, this.mode)
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
    onFilterActivated () {
      this.setActivityBarMode('filter')
    },
    onFilterCanceled () {
      this.setActivityBarMode(this.mode)
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
    this.$options.components['k-modal-viewer'] = this.$load('viewer/KModalViewer')
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
