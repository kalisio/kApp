<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">{{ $t('Shapes.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="shape in shapes" :key="shape.type">
        <tr>
          <td>{{ shape.type }}</td>
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
  { type: 'circle', tooltip: 'Circle' },
  { type: 'ellipse', width: 24, tooltip: 'Ellipse' },
  { type: 'rect', tooltip: 'Rect' },
  { type: 'triangle-up', tooltip: 'Triangle up' },
  { type: 'triangle-down', tooltip: 'Triangle down' },
  { type: 'triangle-right', tooltip: 'Triangle right' },
  { type: 'triangle-left', tooltip: 'Triangle left' },
  { type: 'diamond', tooltip: 'Diamond' },
])
</script>