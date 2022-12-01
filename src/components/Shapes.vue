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
  { type: 'circle' },
  { type: 'ellipse', width: 24 },
  { type: 'rect' },
  { type: 'triangle-up' },
  { type: 'triangle-down' },
  { type: 'triangle-right' }, 
  { type: 'triangle-left' },
  { type: 'diamond' }
])
</script>