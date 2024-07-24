<template>
  <KActivity 
    name="layout"
    padding
  >
     <!-- Use default content slot -->
  </KActivity>
</template>

<script setup>
import { Layout } from '@kalisio/kdk/core.client'
import { onMounted, onBeforeUnmount } from 'vue';

// Functions
function setMode (mode) {
  Layout.setMode(mode)
}

// Hooks
onMounted(() => {
  Layout.setHeader({ content: [{ component: 'layout/Header' }] })
  Layout.setFooter({ content: [{ component: 'layout/Footer' }] })
})
onBeforeUnmount (() => {
  Layout.setHeader({ content: null })
  Layout.setFooter({ content: null })
})

// Expose
defineExpose({
  setMode
})
</script>
