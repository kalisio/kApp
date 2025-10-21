<template>
  <KActivity name="colors" :mode="mode" />
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: true
  }
})
</script>
