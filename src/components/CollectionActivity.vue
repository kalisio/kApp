<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Item list rendering
      -->
      <k-list v-if="page==='list'" service="documents" :renderer="itemRenderer" :filter-query="filter.query" />
      <!--
        Card grid rendering
      -->
      <k-grid v-if="page==='grid'" service="documents" :renderer="cardRenderer" :filter-query="filter.query"  />
      <!--
        Card grid rendering
      -->
      <k-table v-if="page==='table'" service="documents" :nb-items-per-page="2" :item-actions="tableActions" selection="multiple" :filter-query="filter.query" />
      <!--
        Enable modal
       -->
      <router-view :router="getRouter()" />
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
export default {
  name: 'collection-activity',
  mixins: [kCoreMixins.baseActivity()],
  props: {
    page: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      userName:  this.$store.get('user.name'),
      filter: this.$store.get('filter'),
      itemRenderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [
            { 
              id: 'view-document', 
              icon: 'las la-glasses', 
              label: 'Documents.VIEW', 
              handler: (document) => this.$router.push({ name: 'view-document', params: { service: 'documents', objectId: document._id } })
            },
            { 
              id: 'edit-document', 
              icon: 'las la-edit', 
              label: 'Documents.EDIT', 
              handler: (document) => this.$router.push({ name: 'edit-document', params: { service: 'documents', objectId: document._id } })
            },
            { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
            { 
              id: 'remove-document',
              icon: 'las la-trash', label: 'Documents.DELETE',
              handler: (document) => this.onDeleteDocument(document) 
            }
          ]
        }
      },
      cardRenderer: {
        component: 'collection/KCard',
        props: {
          itemActions: [
            { 
              id: 'view-document', 
              icon: 'las la-glasses', 
              tooltip: 'Documents.VIEW', 
              handler: (document) => this.$router.push({ name: 'view-document', params: { service: 'documents', objectId: document._id } })
            },
            { 
              id: 'edit-document', 
              icon: 'las la-edit',
              tooltip: 'Documents.EDIT',
              handler: (document) => this.$router.push({ name: 'edit-document', params: { service: 'documents', objectId: document._id } })
            },
            { component: 'frame/KMenu', id: 'overflow-menu', actionRenderer: 'item', content: [
            { 
              id: 'remove-document',
              icon: 'las la-trash',
              label: 'Documents.DELETE',
              handler: (document) => this.deleteDocument(document) }
            ]}
          ]
        }
      },
      tableActions: [
        { 
          id: 'view-document', 
          icon: 'las la-glasses', 
          label: 'Documents.VIEW', 
          handler: (document) => this.$router.push({ name: 'view-document', params: { service: 'documents', objectId: document._id } })
        },
        { 
          id: 'edit-document', 
          icon: 'las la-edit', 
          label: 'Documents.EDIT', 
          handler: (document) => this.$router.push({ name: 'edit-document', params: { service: 'documents', objectId: document._id } })
        },
        { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
        { 
          id: 'remove-document',
          icon: 'las la-trash',
          label: 'Documents.DELETE',
          handler: (document) => this.deleteDocument(document)
        }
      ]
    }
  },
  watch: {
    page: function () {
      this.restoreTopPaneMode()
    }
  },
  methods: {
    getRouter () {
      return {
        onApply: { name: 'collection-activity' },
        onDismiss: { name: 'collection-activity' }
      }
    },
    restoreTopPaneMode () {
      this.setTopPaneMode(this.page)
    },
    async onDeleteDocument (document) {
      await this.$api.getService('documents').remove(document._id)
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-list'] = this.$load('collection/KList')
    this.$options.components['k-grid'] = this.$load('collection/KGrid')
    this.$options.components['k-table'] = this.$load('collection/KTable')
    // Configure the activity
    this.configureActivity()
  }
}
</script>
