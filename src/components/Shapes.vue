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
          <td>{{ shape.name }}</td>
          <td>
            <KShape :options="shape.options" :tooltip="JSON.stringify(shape.options)" />
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue'

const shapes = ref([
  { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', stroke: { color: 'grey', width: '1' } } },
  { name: 'Ellipse', options: { shape: 'circle', size: [36, 24], color: 'red', stroke: { color: 'grey', width: '2' } } },
  { name: 'Rect', options: { shape: 'rect', color: 'blue', stroke: { color: 'grey', width: '3'} } },
  { name: 'Triangle', options: { shape: 'triangle', color: 'green', stroke: { color: 'grey', swidth: '4'} } },
  { name: 'Triangle down', options: { shape: 'triangle-down', color: 'orange', stroke: { color: 'grey', swidth: '2'} } },
  { name: 'Triangle right', options: { shape: 'triangle-right', color: 'red', stroke: { color: 'grey', swidth: '3'} } },
  { name: 'Triangle left', options: { shape: 'triangle-left', color: 'purple', stroke: { color: 'grey', swidth: '1'} } },
  { name: 'Diamond', options: { shape: 'diamond', color: 'magenta', stroke: { color: 'grey', swidth: '2'} } },
  { name: 'Marker pin', options: { shape: 'marker-pin', color: 'darkgreen', stroke: { color: 'grey', swidth: '1'} } },
  { name: 'Square pin', options: { shape: 'square-pin', color: 'turquoise', stroke: { color: 'grey', swidth: '1'} } }
])
</script>