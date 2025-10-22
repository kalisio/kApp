<template>
  <div class="full-height column justify-center">
    <div class="row items-center">
      <KChip v-for="(value, key) in kdkCoreUtils.HtmlPalette" :color="value" class="q-px-md">
        {{ key }}
      </KChip>
    </div>
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

