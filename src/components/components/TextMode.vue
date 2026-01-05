<template>
  <div class="row full-width justify-center q-gutter-sm">
    <Stamps class="q-pa-xs col-xs-12 col-sm-12 col-md-5 col-3" />
    <ComponentCard title="KTextArea" :code="KTextAreaCode" class="q-pa-xs col-xs-12 col-sm-12 col-md-5 col-3">
      <KTextArea text="TextArea" class="text-h1" />
      <q-separator />
      <KTextArea text="TextArea" />
    </ComponentCard>
  </div>
</template>

<script setup>
import { KTextArea } from '@kalisio/kdk/core/client/components'
import { KTextAreaCode } from '../raw'
import ComponentCard from './ComponentCard.vue'
import Stamps from './Stamps.vue'


</script>