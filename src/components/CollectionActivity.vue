<template>
  <k-page padding>
    <template v-slot:page-content>
      <!-- 
        The content is defined using page content capabilities
        We just need to add a router-view to enable modal routing
       -->
      <router-view service="documents" :parentActivity="activityName" />
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
      sorter: this.$store.get('sorter')
    }
  },
  computed: {
    baseQuery () {
      return this.sorter.query
    }
  },  
  watch: {
    page: function () {
      this.restoreTopPaneMode()
    }
  },
  methods: {
    restoreTopPaneMode () {
      this.setTopPaneMode(this.page)
      this.setPageMode(this.page)
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
  }
}
</script>
