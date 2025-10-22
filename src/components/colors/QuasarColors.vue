<template>
  <div class="q-pa-md row justify-center items-center q-gutter-md row">
    <div v-for="family of QuasarFamilies" class="column">
      <KChip square :color="family">
        {{ family }}
      </KChip>
      <KChip square v-for="color in 14" :color="`${family}-${color}`">
        {{ `${family}-${color}` }}
      </KChip>
    </div>
  </div>
</template>

<script setup>
import { utils as kdkCoreUtils, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { setTopPaneMode } = kdkCoreComposables.useLayout()
const QuasarFamilies = [
  'red', 'pink', 'purple', 'deep-purple', 'indigo', 'blue', 'light-blue',
  'cyan', 'teal', 'green', 'light-green', 'lime', 'yellow', 'amber',
  'orange', 'deep-orange', 'brown', 'grey', 'blue-grey'
]
// Expose
defineExpose({
  // must be exposed in order to be known by the handlers in the config
  setTopPaneMode
})
</script>

