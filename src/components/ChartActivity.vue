<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Item list rendering
      -->
      <!--k-chart /-->
    </template>
    <!--
      Enable modal
     -->
    <router-view service="documents" :parentActivity="activityName" />
  </k-page>
</template>

<script>
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'

export default {
  name: 'chart-activity',
  mixins: [kCoreMixins.baseActivity()],
  data () {
    return {
      topPane: this.getTopPane()
    }
  },
  watch: {
    'topPane.mode': {
       handler () {
         console.log(this.topPane.mode)
       }
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-chart'] = this.$load('frame/KChart')
  }
}
</script>
