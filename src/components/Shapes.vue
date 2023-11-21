<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">{{ $t('Shapes.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="shape in shapes" :key="shape.shape">
        <tr>
          <td>{{ shape.tooltip }}</td>
          <td>
            <KShape v-bind="shape" />
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue'

const shapes = ref([
  { shape: 'circle', tooltip: 'Circle', fill: 'lightgrey', stroke: 'grey', strokeWidth: '1' },
  { shape: 'circle', width: 24, tooltip: 'Ellipse', fill: 'red', stroke: 'grey', strokeWidth: '2' },
  { shape: 'rect', tooltip: 'Rect', fill: 'blue', stroke: 'grey', strokeWidth: '3' },
  { shape: 'triangle', tooltip: 'Triangle up', fill: 'green', stroke: 'grey', strokeWidth: '4' },
  { shape: 'triangle-down', tooltip: 'Triangle down', fill: 'orange', stroke: 'grey', strokeWidth: '2' },
  { shape: 'triangle-right', tooltip: 'Triangle right', fill: 'red', stroke: 'grey', strokeWidth: '3' },
  { shape: 'triangle-left', tooltip: 'Triangle left', fill: 'purple', stroke: 'grey', strokeWidth: '1' },
  { shape: 'diamond', tooltip: 'Diamond', fill: 'magenta', stroke: 'grey', strokeWidth: '2' },
  { shape: 'marker-pin', tooltip: 'Marker Pin', fill: 'darkgreen', stroke: 'grey', strokeWidth: '1' },
  { shape: 'square-pin', tooltip: 'Square Pin', fill: 'turquoise', stroke: 'grey', strokeWidth: '1' },
])
</script>