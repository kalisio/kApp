<template>
  <KActivity
    name="miscellaneous"
    padding
  >
    <div class="row full-width justify-center q-gutter-md">
      <Stamps />
      <Shapes />
      <ColorScales />
      <Times />
    </div>
  </KActivity>
</template>

<script setup>
import Stamps from './Stamps.vue'
import Shapes from './Shapes.vue'
import ColorScales from './ColorScales.vue'
import Times from './Times.vue'
</script>
