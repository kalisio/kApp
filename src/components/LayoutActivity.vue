<template>
  <k-page>
    <template v-slot:page-content>
      <div class="fixed-center text-h5">Layout</div>
    </template>
  </k-page>
</template>

<script>
import { mixins, utils } from '@kalisio/kdk/core.client'

export default {
  name: 'layout-activity',
  components: {
    KPage: utils.loadComponent('layout/KPage')
  },
  mixins: [ mixins.baseActivity() ]
}
</script>