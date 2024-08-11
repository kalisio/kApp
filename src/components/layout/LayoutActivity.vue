<template>
  <KActivity 
    name="layout"
    :mode="mode"
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
