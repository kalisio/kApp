<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <KStore />
      </div>
    </template>
  </KPage>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'store-activity',
  mixins: [mixins.baseActivity()]
}
</script>