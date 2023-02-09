<template>
  <KPage padding>
    <template v-slot:page-content>
      <!--
        The content is defined using page content capabilities
        We just need to add a router-view to enable modal routing
       -->
      <router-view service="documents" />
    </template>
  </KPage>
</template>

<script>
import logger from 'loglevel'
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'collection-activity',
  mixins: [mixins.baseActivity()],
  props: {
    page: {
      type: String,
      required: true
    }
  },
  data () {
    return {
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
    page: {
      handler (value) {
        this.refresh()
      }
    }
  },
  methods: {
    refresh () {
      logger.debug(`[kApp] switching to collection mode '${this.page}'`)
      this.setTopPaneMode(this.page)
      this.setPageMode(this.page)
    }
  },  
  mounted () {
    this.refresh()
  }
}
</script>
