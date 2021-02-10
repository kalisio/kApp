<template>
  <div>
    <!--
      Item list rendering
    -->
    <k-list service="documents" :renderer="renderer" :filter-query="filter.query" />
    <router-view></router-view>
  </div>
</template>

<script>
import documentsMixin from '../mixins/mixins.documents'

export default {
  name: 'list-view',
  mixins: [documentsMixin],
  data () {
    return {
      renderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [
            { 
              id: 'view-document', 
              icon: 'las la-glasses', 
              label: 'MainActivity.VIEW_DOCUMENT', 
              handler: (document) => this.$router.push({ name: 'view-document', params: { service: 'documents', objectId: document._id } })
            },
            { 
              id: 'edit-document', 
              icon: 'las la-edit', 
              label: 'MainActivity.EDIT_DOCUMENT', 
              handler: (document) => this.$router.push({ name: 'edit-document', params: { service: 'documents', objectId: document._id } })
            },
            { component: 'QSeparator', color: 'lightgrey', style: 'min-height: 1px;' },
            { 
              id: 'remove-document',
              icon: 'las la-trash', label: 'MainActivity.REMOVE_DOCUMENT',
              handler: (document) => this.deleteDocument(document) 
            }
          ]
        }
      },
      filter: this.$store.get('filter')
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-list'] = this.$load('collection/KList')
  }
}
</script>
