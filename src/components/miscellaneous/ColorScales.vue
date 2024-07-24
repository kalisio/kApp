<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">{{ $t('ColorScales.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <div class="q-pa-md column q-gutter-y-md">
          <template v-for="colorScale in hColorScales" :key="colorScale.label">
            <KColorScale v-bind="colorScale" style="width: 250px; height: 46px"/>
          </template>
        </div>
        <div class="q-pa-md row q-gutter-x-md">
          <template v-for="colorScale in vColorScales" :key="colorScale.label">
            <KColorScale v-bind="colorScale" style="width: 50px; height: 200px"/>
          </template>
        </div>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue'

const hColorScales = ref([
  { label: 'Blues', colors: 'Blues', domain: [-50, 50], layout: { bar: { height: 16 }, label: { align: 'center' } } },
  { label: 'Greens', colors: 'Greens', classes: [5e-324,100,500,1000,5000,10000,1.7976931348623157e+308] },
  { label: 'Reds', colors: 'Reds', domain: [-100, 10], layout: { label: { align: 'right' } } }
])

const vColorScales = ref([
  { label: 'BuGn', colors: 'BuGn', domain: [0, 100], direction: 'vertical' },
  { label: 'YlGn', colors: 'YlGn', classes: [5e-324,100,500,1000,5000,10000,1.7976931348623157e+308], direction: 'vertical' }
])

</script>