<template>
  <KScrollArea class="full-height">
    <div class="full-width full-height q-gutter-md row flex-center" style="font-size: large;">
      <div v-for="family of kdkCoreUtils.QuasarFamilies" class="column">
        <KChip square :color="family">
          {{ family }}
        </KChip>
        <KChip square v-for="color in 14" :color="`${family}-${color}`">
          {{ `${family}-${color}` }}
        </KChip>
      </div>
    </div>
  </KScrollArea>
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

