<template>
  <Stamps />
  <KTextArea text="TextArea" class="text-h1" />
  <KTextArea text="TextArea" />
</template>

<script setup>
import { KTextArea } from '@kalisio/kdk/core/client/components';
import Stamps from './Stamps.vue';
</script>