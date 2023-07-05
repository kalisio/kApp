<template>
  <div class="fit q-pa-md">
    <q-resize-observer @resize="onResized" />
    <KStamp
      :text="message"
      text-size="1.2rem"
      icon="las la-info-circle"
      icon-size="1.5rem"
      direction="horizontal"
    />
  </div>
</template>

<script setup>
import { ref } from 'vue'

// Data
const message = ref('')

// Functions
function onResized (size) {
  message.value = `${size.width} x ${size.height}`
} 
</script>