<template>
  <k-page padding>
    <template v-slot:page-content>
      <router-view />
    </template>
  </k-page>
</template>

<script>
import { mixins, utils } from '@kalisio/kdk/core.client'

export default {
  name: 'editor-activity',
    components: {
      KPage: utils.loadComponent('layout/KPage')
  },
  mixins: [ mixins.baseActivity() ]
}
</script>
