<template>
  <div class="q-pa-md">
    <q-card>
      <q-card-section>
        <KMarkdownViewer url="/kapp-terms.md" />
      </q-card-section>
    </q-card>
  </div>
</template>

<script>
import { utils } from '@kalisio/kdk/core.client'

export default {
  name: 'terms',
  components: {
    KMarkdownViewer: utils.loadComponent('/media/KMarkdownViewer')
  }
}
</script>
