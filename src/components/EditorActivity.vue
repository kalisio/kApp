<template>
  <k-page padding>
    <template v-slot:page-content>
      <router-view />
    </template>
  </k-page>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'editor-activity',
  mixins: [mixins.baseActivity()]
}
</script>
