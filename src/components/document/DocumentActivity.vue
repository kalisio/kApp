<template>
  <KActivity
    name="document"
    :mode="type"
    padding
  />
</template>

<script setup>
defineProps({
  type: {
    type: String,
    required: true
  }
})
</script>
