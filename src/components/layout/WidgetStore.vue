<template>
  <div class="fit column">
    <q-resize-observer @resize="onResized" />
    <div class="row">
      <KScrollArea class="col" :maxHeight="height">
        <div class="row q-pa-md justify-center full-width">
          <div class="col-12">
            <KStore />
          </div>
        </div>
      </KScrollArea>
    </div>
  </div>

</template>

<script setup>
import { ref } from 'vue'

// Data
const height = ref(0)

// Functions
function onResized (size) {
  height.value = size.height
}
</script>