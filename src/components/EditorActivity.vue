<template>
  <KPage padding>
    <template v-slot:page-router>
      <router-view />
    </template>
  </KPage>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'editor-activity',
  mixins: [mixins.baseActivity()]
}
</script>
