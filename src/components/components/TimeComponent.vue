<template>
  <q-card>
    <div class="q-pa-sm full-width text-subtitle1 bg-primary text-white">
      {{ title }}
    </div>
    <q-card-section>
      <slot />
    </q-card-section>
    <q-separator inset />
    <div class="q-pa-sm full-width row items-baseline q-gutter-x-md">
      <span class="text-caption">Model:</span>
      <span class="text-subtitle2">{{ model }}</span>
    </div>
  </q-card>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true
  },
  model: {
    type: String,
    default: null
  }
})
</script>