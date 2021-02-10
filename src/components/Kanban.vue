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
        :filter-query="filterQuery" />
    </template>
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import documentsMixin from '../mixins/mixins.documents'

export default {
  name: 'kanban',
  mixins: [
    kCoreMixins.baseActivity(),
    documentsMixin
  ],
  data () {
    return {
      categories: null,
      filterQuery: null,
      cardRenderer: {
        component: 'collection/KCard',
        props: {
          itemActions: [
            { id: 'view-document', icon: 'las la-glasses', tooltip: 'MainActivity.VIEW_DOCUMENT', handler: (document) => this.onViewDocument(document) }
          ]
        }
      }
    }
  },
  methods: {
    onFilterChanged (query) {
      console.log(query)
      this.filterQuery = query
    },
    refreshActivity () {
      // Does nothing
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-board'] = this.$load('collection/KBoard')
    // Configure once the activity
    this.configureActivity()
    // Setup the pane mode according the current page
    this.categories = this.activityOptions.categories
    this.categoryField = this.activityOptions.categoryField
  }
}
</script>
