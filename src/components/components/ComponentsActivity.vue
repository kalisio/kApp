<template>
  <KActivity name="components" :mode="mode" />
</template>

<script setup>
defineProps({
  mode: {
    type: String,
    required: true
  }
})
</script>
