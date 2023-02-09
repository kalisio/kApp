<template>
  <KPage padding>
    <template v-slot:page-content>
      <!--
        Chart rendering
      -->
      <div class="q-pa-lg row justify-center">
        <q-option-group
          v-model="currentField"
          :options="fieldOptions"
          inline />
        <KChart
          ref="chart"
          class="q-pa-lg"
          style="width: 90vw; height: 75vh" />
      </div>
    </template>
    <!--
      Enable modal
     -->
    <router-view service="documents" />
  </KPage>
</template>

<script>
import { mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'chart-activity',
  mixins: [mixins.baseActivity()],
  data () {
    return {
      topPane: this.getTopPane(),
      currentField: '',
      fieldOptions: [
        { label: 'Etat santiraire', value: 'etat_sani' },
        { label: 'Etat mécanique', value: 'etat_meca' }
      ],
      chartType: 'pie',
      chartLabels: [],
      chartDatasets: [],
      chartOptions: {}
    }
  },
  watch: {
    'topPane.mode': {
      handler () {
        this.chartType = this.topPane.mode
        this.refresh()
      }
    },
    currentField: {
      async handler () {
        this.chartLabels = this.fieldLabels[this.currentField]
        const data = []
        for (let i = 0; i < this.chartLabels.length; ++i) {
          data.push(await this.countItems({ [this.currentField]: this.chartLabels[i] }))
        }
        this.chartDatasets = [{ label: this.currentField, data, colorScale: 'YlGnBu' }]
        this.refresh()
      }
    }
  },
  methods: {
    async countItems (query = {}) {
      const service = this.$api.getService('documents')
      const response = await service.find({ query, $limit: 0 })
      return response.total
    },
    refresh () {
      if (this.$refs.chart) {
        this.$refs.chart.update({
          type: this.chartType,
          data: {
            labels: this.chartLabels,
            datasets: this.chartDatasets
          },
          options: this.chartOptions
        })
      }
    }
  },
  async created () {
    this.fieldLabels = {
      etat_sani: ['sain', 'malade', 'declin'],
      etat_meca: ['sur', 'defectueux', 'rupture', 'danger']
    }
    this.currentField = 'etat_sani'
  }
}
</script>
