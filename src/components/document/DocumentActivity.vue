<template>
  <KActivity
    name="document"
    :mode="type"
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
