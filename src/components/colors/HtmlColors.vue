<template>
  <div class="full-height flex flex-center">
    <div class="row flex-center" style="font-size: large;">
      <KChip v-for="(value, key) in kdkCoreUtils.HtmlPalette" :color="value" class="detailed-color column q-px-md">
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

<style lang="scss">
  .detailed-color {
    height: 40px;
  }
</style>
