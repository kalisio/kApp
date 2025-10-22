<template>
  <div class="q-pa-md row justify-center items-center q-gutter-sm">
    <KChip v-for="(value, key) in kdkCoreUtils.HtmlPalette" :color="value">
      {{ key }}
    </KChip>
  </div>
</template>

<script setup>
import { utils as kdkCoreUtils, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { setTopPaneMode } = kdkCoreComposables.useLayout()

// Expose
defineExpose({
  // must be exposed in order to be known by the handlers in the config
  setTopPaneMode
})
</script>

