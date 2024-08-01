<template>
  <KActivity 
    name="screen"
    padding
  >
    <div class="q-pa-md fixed-center column items-center q-gutter-y-xl">
      <KStamp
        :text="text" 
        textSize="1rem"
        :icon="ScreenOrientation === 'portrait' ? 'las la-portrait' : 'las la-image'" 
        iconSize="8rem"
        direction="vertical"
      /> 
      <KToggleFullscreenAction
        id="toggle-fullscreen" 
        icon="las la-expand"
        label="ScreenActivity.ENTER_FULLSCREEN"
        :toggle="{ icon: 'las la-compress', label: 'ScreenActivity.EXIT_FULLSCREEN' }"
        renderer="form-button"
      />
    </div>
  </KActivity>
</template>

<script setup>
import { computed } from 'vue'
import { i18n, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { Orientation: ScreenOrientation, Screen } = kdkCoreComposables.useScreen()

// Computed
const text = computed(() => {
  return i18n.t(ScreenOrientation === 'portrait' ? 'ScreenActivity.PORTRAIT_ORIENTATION' : 'ScreenActivity.LANDSCAPE_ORIENTATION', { w: Screen.width, h: Screen.height })
})
</script>
