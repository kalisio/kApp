<template>
  <KActivity
    name="document"
    :mode="type"
    padding
  />
</template>

<script setup>
// Props
defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>
