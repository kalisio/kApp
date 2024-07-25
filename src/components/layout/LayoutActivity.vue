<template>
  <KActivity 
    name="layout"
    :mode="mode"
    padding
  />
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: true
  }
})
</script>
