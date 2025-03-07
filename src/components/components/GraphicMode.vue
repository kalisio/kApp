<template>
  <div class="row full-width q-gutter-md justify-center text-center">
    <Shapes />
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <ColorScales />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <Chips />
    </div>
    <div class="col-xs-12 col-sm-6 col-md-4 col-lg-3">
      <Logos />
    </div>
  </div>

</template>

<script setup>
import Chips from './Chips.vue'
import ColorScales from './ColorScales.vue'
import Logos from './Logos.vue'
import Shapes from './Shapes.vue'
</script>