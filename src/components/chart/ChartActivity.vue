<template>
  <KActivity name="chart">
    <!--
      Chart rendering
    -->
    <div class="q-pa-lg row justify-center">
      <q-option-group
        v-model="currentField"
        :options="fieldOptions"
        inline />
      <KChart
        :ref="chartRefCreated"
        class="q-pa-lg"
        style="width: 90vw; height: 75vh" 
      />
    </div>
    <!--
      Enable modal
      -->
    <router-view service="documents" />
  </KActivity>
</template>

<script setup>
import _ from 'lodash'
import { ref, watch } from 'vue'
import { api, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { Layout, setTopPaneMode } = kdkCoreComposables.useLayout()
const topPane = Layout.getPane('top')
const chartRef = ref(null)
const currentField = ref('etat_sani')
const fieldLabels = {
  etat_sani: ['sain', 'malade', 'declin'],
  etat_meca: ['sur', 'defectueux', 'rupture', 'danger']
}
const fieldOptions = [
  { label: 'Etat sanitaire', value: 'etat_sani' },
  { label: 'Etat mécanique', value: 'etat_meca' }
]
const chartType = ref('pie')

// Watch
watch(topPane, async () => {
  chartType.value = topPane.mode
  await refresh()
})
watch(currentField, async () => {
  await refresh()
})
  
// Functions
async function chartRefCreated (instance) {
  if (instance) {
    chartRef.value = instance
    await refresh()
  }
}
async function countItems (query = {}) {
  const service = api.getService('documents')
  const response = await service.find({ query, $limit: 0 })
  return response.total
}
const refresh = _.debounce(async () => {
  if (!chartRef.value) return
  const labels = fieldLabels[currentField.value]
  // update datasets
  const data = []
  for (let i = 0; i < labels.length; ++i) {
    data.push(await countItems({ [currentField.value]: labels[i] }))
  }
  // update chart
  chartRef.value.update({
    type: chartType.value,
    data: {
      labels,
      datasets: [{ label: currentField.value, data, colorScale: 'YlGnBu' }]
    },
    options: {}
  })
}, 300)

// Expose
defineExpose({
  // must be exposed in order to be known by the handlers in the config
  setTopPaneMode
})
</script>
