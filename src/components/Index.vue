<template>
  <div>
    <KTour v-if="isInitialized"/>
    <router-view></router-view>
  </div>
</template>

<script setup>
import { composables, Store } from '@kalisio/kdk/core.client'
import { watch } from 'vue'

// Immediate
const { isInitialized } = composables.useSession()

// Watch
watch(Store, (currentValue) => {
  if (currentValue.capabilities) composables.checkVersion()
})
</script>
