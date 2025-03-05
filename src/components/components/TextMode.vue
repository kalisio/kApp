<template>
  <Stamps />
  <ComponentCard title="KTextArea" :code="KTextAreaCode">
    <KTextArea text="TextArea" class="text-h1" />
    <q-separator />
    <KTextArea text="TextArea" />
  </ComponentCard>


</template>

<script setup>
import { KTextArea } from '@kalisio/kdk/core/client/components';
import ComponentCard from './ComponentCard.vue';
import Stamps from './Stamps.vue';

const KTextAreaCode =
  `<ComponentCard title="KTextArea" :code="KTextAreaCode">
  <KTextArea text="TextArea" class="text-h1" />
  <q-separator />
  <KTextArea text="TextArea" />
</ComponentCard>`
</script>