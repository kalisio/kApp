<template>
  <div class="row q-gutter-x-md">
    <template v-for="key in ['size', 'radius', 'custom']" :key="key">
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
import { Shapes } from '@kalisio/kdk/core/client/utils/utils.shapes.js'

const radius = 12

Shapes['Full-pin'] = {
  viewBox: [0, 0, 14, 24],
  content: '<path class="cls-1" d="M13.71,6.86c0-3.79-3.07-6.86-6.86-6.86S0,3.07,0,6.86c0,1.87.75,3.56,1.96,4.8h-.04c2.47,2.47,4.94,12.34,4.94,12.34,0,0,2.47-9.87,4.94-12.34h-.04c1.21-1.24,1.96-2.93,1.96-4.8Z"/>'
}
Shapes['Empty-pin'] = {
  viewBox: [0, 0, 14, 24],
  content: '<path class="cls-1" d="M13.71,6.86c0-3.79-3.07-6.86-6.86-6.86S0,3.07,0,6.86c0,1.88.76,3.58,1.98,4.82l-.06-.02c2.47,2.47,4.94,12.34,4.94,12.34,0,0,2.47-9.87,4.94-12.34l-.06.02c1.22-1.24,1.98-2.94,1.98-4.82ZM6.86,1.71c2.84,0,5.14,2.3,5.14,5.14s-2.3,5.14-5.14,5.14S1.71,9.7,1.71,6.86,4.02,1.71,6.86,1.71Z"/>'
}
Shapes['Pin-with-empty-star'] = {
  viewBox: [0, 0, 14, 24],
  content: '<path class="cls-1" d="M13.71,6.86c0-3.79-3.07-6.86-6.86-6.86S0,3.07,0,6.86c0,1.87.75,3.56,1.96,4.8h-.04c2.47,2.47,4.94,12.34,4.94,12.34,0,0,2.47-9.87,4.94-12.34h-.04c1.21-1.24,1.96-2.93,1.96-4.8ZM5.58,5.14l1.28-3.93,1.28,3.93h4.13l-3.34,2.43,1.28,3.93-3.34-2.43-3.34,2.43,1.28-3.93-3.34-2.43h4.13Z"/>'
}
Shapes['Full-circle'] = {
  viewBox: [0, 0, 24, 24],
  content: '<circle class="cls-1" cx="12" cy="12" r="12"/>'
}
Shapes['Empty-circle'] = {
  viewBox: [0, 0, 24, 24],
  content: '<path class="cls-1" d="M24,12c0,6.63-5.37,12-12,12S0,18.63,0,12,5.37,0,12,0s12,5.37,12,12ZM12,3C7.03,3,3,7.03,3,12s4.03,9,9,9,9-4.03,9-9S16.97,3,12,3Z"/>'
}
Shapes['Full-circle-with-empty-star'] = {
  viewBox: [0, 0, 24, 24],
  content: '<path class="cls-1" d="M9.77,9H2.54s5.85,4.25,5.85,4.25l-2.23,6.87,5.85-4.25,5.85,4.25-2.23-6.87,5.85-4.25h-7.23s-2.23-6.87-2.23-6.87l-2.23,6.87ZM24,12c0,6.63-5.37,12-12,12S0,18.63,0,12,5.37,0,12,0s12,5.37,12,12Z"/>'
}
Shapes['Full-rounded-square-with-empty-star'] = {
  viewBox: [0, 0, 24, 24],
  content: '<path class="cls-1" d="M3.13,0h17.74c1.73,0,3.13,1.4,3.13,3.13v17.74c0,1.73-1.4,3.13-3.13,3.13H3.13c-1.73,0-3.13-1.4-3.13-3.13V3.13C0,1.4,1.4,0,3.13,0ZM9.77,8.88H2.54s5.85,4.25,5.85,4.25l-2.23,6.87,5.85-4.25,5.85,4.25-2.23-6.87,5.85-4.25h-7.23s-2.23-6.87-2.23-6.87l-2.23,6.87Z"/>'
}
Shapes['Full-rounded-square'] = {
  viewBox: [0, 0, 24, 24],
  content: '<rect class="cls-1" width="24" height="24" rx="3.13" ry="3.13"/>'
}

const shapes = ref({
  size: [
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', stroke: { color: 'orange', width: '3' } } },
    { name: 'Ellipse', options: { shape: 'circle', size: [48, 24], color: 'red', stroke: { color: 'grey', width: '1' } } },
    { name: 'Rect', options: { shape: 'rect', color: 'blue', stroke: { color: 'grey', width: '3'} } },
    { name: 'Triangle', options: { shape: 'triangle', color: 'green', stroke: { color: 'orange', width: '4'} } },
    { name: 'Triangle down', options: { shape: 'triangle-down', color: 'orange', stroke: { color: 'grey', width: '2'} } },
    { name: 'Triangle right', options: { shape: 'triangle-right', color: 'red', stroke: { color: 'black', width: '3'} } },
    { name: 'Triangle left', options: { shape: 'triangle-left', color: 'purple', stroke: { color: 'grey', width: '1'} } },
    { name: 'Diamond', options: { shape: 'diamond', color: 'magenta', stroke: { color: 'blue', width: '2'} } },
    { name: 'Star', options: { shape: 'star', color: 'yellow', stroke: { color: 'orange', width: '1'} } },
    { name: 'Marker pin', options: { shape: 'marker-pin', color: 'darkgreen', stroke: { color: 'orange', width: '1'} } },
    { name: 'Square pin', options: { shape: 'square-pin', color: 'turquoise', stroke: { color: 'grey', width: '1'}, text: { label: '15', color: 'red', size: '14px'/*, translation: [ '0px', '-71px' ]*/ } } }
  ],
  radius: [
    { name: 'Circle', options: { shape: 'circle', color: 'lightgrey', radius , stroke: { color: 'black' } } },
    { name: 'Rect', options: { shape: 'rect', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Triangle', options: { shape: 'triangle', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle down', options: { shape: 'triangle-down', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle left', options: { shape: 'triangle-left', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Triangle right', options: { shape: 'triangle-right', color: 'lightgrey',radius, stroke: { color: 'black' } } },
    { name: 'Diamond', options: { shape: 'diamond', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Star', options: { shape: 'star', color: 'lightgrey', radius, stroke: { color: 'black' } } },
    { name: 'Circle & icon', options: { shape: 'circle', color: 'lightgrey', radius, stroke: { color: 'black' }, icon: { classes: 'las la-home' } } },
    { name: 'Circle & text', options: { shape: 'circle', color: 'lightgrey', radius, stroke: { color: 'black' }, text: { label: '01'} } },
    { name: 'Icon Classes', options: {  icon: { classes: 'las la-home', size: 24, rotation: 90, color: 'green' }, radius } },
    { name: 'Icon Url', options: {  icon: { url: '/icons/plane.png', size: 24, rotation: 90, opacity: 0.5 }, radius } },
    { name: 'Text only', options: {  text: { label: 'Home', rotation: 45, color: 'red' }, radius } },
    { name: 'Html only', options: {  html: "<img src='/icons/plane.png' width='32px' height='32px' />" } }
  ],
  custom: [
    { name: 'Full pin', options: { shape: 'Full-pin', size: [24, 41.14], color: 'lightblue' } },
    { name: 'Empty pin', options: { shape: 'Empty-pin', size: [24, 41.14], color: 'lightblue' } },
    { name: 'Pin with empty star', options: { shape: 'Pin-with-empty-star', size: [24, 41.14], color: 'lightblue' } },
    { name: 'Full rounded square with empty star', options: { shape: 'Full-rounded-square-with-empty-star', color: 'limegreen' } },
    { name: 'Full rounded square', options: { shape: 'Full-rounded-square', color: 'limegreen' } },
    { name: 'Full circle', options: { shape: 'Full-circle', color: 'pink' } },
    { name: 'Empty circle', options: { shape: 'Empty-circle', color: 'pink' } },
    { name: 'Full circle with empty star', options: { shape: 'Full-circle-with-empty-star', color: 'pink' } }
  ]
})
</script>
