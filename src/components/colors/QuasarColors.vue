<template>
  <KScrollArea class="full-height">
    <div class="full-width full-height q-gutter-md row items-center justify-center" style="font-size: large;">
      <q-card v-for="family of kdkCoreUtils.QuasarFamilies" flat class="column">
        <KChip square :color="family" class="column flex flex-center text-white q-ma-none">
          {{ family }}
        </KChip>
        <KChip square v-for="color in 14" :color="`${family}-${color}`" class="column flex-center text-white detailed-color q-ma-none">
          {{ `${family}-${color}` }}
        </KChip>
      </q-card>
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

<style lang="scss">
  .detailed-color {
    height: 40px;
  }
</style>
