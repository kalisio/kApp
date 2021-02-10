<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Item list rendering
      -->
      <k-board 
        service="documents" 
        :categories="categories" 
        :categoryField="categoryField"
        :renderer="cardRenderer" 
        :filter-query="filter.query" />
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'kanban',
  mixins: [kCoreMixins.baseActivity()],
  data () {
    return {
      categories: null,
      filter: this.$store.get('filter'),
      cardRenderer: {
        component: 'collection/KCard',
        props: {
          itemActions: [
            { id: 'view-document', icon: 'las la-glasses', tooltip: 'KanbanActivity.VIEW_DOCUMENT', handler: (document) => this.onViewDocument(document) }
          ]
        }
      }
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-board'] = this.$load('collection/KBoard')
    // Configure the activity
    this.configureActivity()
    // Setup the pane mode according the current page
    this.categories = this.activityOptions.categories
    this.categoryField = this.activityOptions.categoryField
  }
}
</script>
