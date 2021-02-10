<template>
  <div>
    <!--
      Card grid rendering
     -->
    <k-grid service="documents" :renderer="renderer" :filter-query="filter.query"  />
  </div>
</template>

<script>
import documentsMixin from '../mixins/mixins.documents'

export default {
  name: 'grid-view',
  mixins: [documentsMixin],
  data () {
    return {
      renderer: {
        component: 'collection/KCard',
        props: {
          itemActions: [
            { 
              id: 'view-document', 
              icon: 'las la-glasses', 
              tooltip: 'MainActivity.VIEW_DOCUMENT', 
              handler: (document) => this.$router.push({ name: 'view-document', params: { service: 'documents', objectId: document._id } })
            },
            { 
              id: 'edit-document', 
              icon: 'las la-edit',
              tooltip: 'MainActivity.EDIT_DOCUMENT',
              handler: (document) => this.$router.push({ name: 'edit-document', params: { service: 'documents', objectId: document._id } })
            },
            { component: 'frame/KMenu', id: 'overflow-menu', actionRenderer: 'item', content: [
            { 
              id: 'remove-document',
              icon: 'las la-trash',
              label: 'MainActivity.REMOVE_DOCUMENT',
              handler: (document) => this.deleteDocument(document) }
            ]}
          ]
        }
      },
      filter: this.$store.get('filter')
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-grid'] = this.$load('collection/KGrid')
  }
}
</script>
