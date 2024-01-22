<template>
  <div class="row q-gutter-x-md">
    <template v-for="key in ['size', 'radius']" :key="key">
      <q-markup-table>
        <thead class="bg-accent text-white">
          <tr>
            <th class="text-left" colspan="2">{{ $t('Shapes.LABEL') }} - {{ key }}</th>
          </tr>
        </thead>
        <tbody>
          <template v-for="shape in shapes[key]" :key="shape.shape">
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
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { utils as kdkCoreUtils } from '@kalisio/kdk/core.client'

const radius = 12

const shapes = ref({
  size: [
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', stroke: { color: 'organge', width: '1' } } },
    { name: 'Ellipse', options: { shape: 'circle', size: [48, 24], color: 'red', stroke: { color: 'grey', width: '2' } } },
    { name: 'Rect', options: { shape: 'rect', color: 'blue', stroke: { color: 'grey', width: '3'} } },
    { name: 'Triangle', options: { shape: 'triangle', color: 'green', stroke: { color: 'orange', width: '4'} } },
    { name: 'Triangle down', options: { shape: 'triangle-down', color: 'orange', stroke: { color: 'grey', width: '2'} } },
    { name: 'Triangle right', options: { shape: 'triangle-right', color: 'red', stroke: { color: 'black', width: '3'} } },
    { name: 'Triangle left', options: { shape: 'triangle-left', color: 'purple', stroke: { color: 'grey', width: '1'} } },
    { name: 'Diamond', options: { shape: 'diamond', color: 'magenta', stroke: { color: 'blue', width: '2'} } },
    { name: 'Star', options: { shape: 'star', color: 'yellow', stroke: { color: 'orange', width: '1'} } },
    { name: 'Marker pin', options: { shape: 'marker-pin', color: 'darkgreen', stroke: { color: 'orange', width: '1'} } },
    { name: 'Square pin', options: { shape: 'square-pin', color: 'turquoise', stroke: { color: 'grey', width: '1'}, text: { label: '15', color: 'red', size: '14px', yOffset: '-11px' } } }
  ],
  radius: [
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', radius , stroke: { color: 'black' } } },
    { name: 'Rect', options: { shape: 'rect', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Triangle', options: { shape: 'triangle', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle down', options: { shape: 'triangle-down', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle-left', options: { shape: 'triangle-left', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle right', options: { shape: 'triangle-right', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Diamond', options: { shape: 'diamond', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Star', options: { shape: 'star', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', radius , stroke: { color: 'black' }, icon: { classes: 'las la-home' } } },
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', radius , stroke: { color: 'black' }, text: { label: '01'} } }
  ]
})
</script>
