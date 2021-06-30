<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Item list rendering
      -->
      <k-chart class="q-pa-lg" :config="chartConfig" />
    </template>
    <!--
      Enable modal
     -->
    <router-view service="documents" :parentActivity="activityName" />
  </k-page>
</template>

<script>
import _ from 'lodash'
import { mixins as kCoreMixins } from '@kalisio/kdk/core.client'
import { Chart, LineElement, BarElement, BarController, LineController, PieController, CategoryScale, LinearScale } from 'chart.js';

Chart.register(
  LineElement,
  BarElement,
  BarController,
  LineController,
  PieController,
  CategoryScale,
  LinearScale
)

export default {
  name: 'chart-activity',
  mixins: [kCoreMixins.baseActivity()],
  computed: {
    chartConfig () {
      console.log('updated chart config')
      return { 
        type: this.chartType, 
        data: { 
          labels: this.chartLabels, 
          datasets: this.chartDatasets
        },
        options: this.chartOptions
      }
    }
  },
  data () {
    return {
      topPane: this.getTopPane(),
      chartType: 'bar',
      chartLabels: [],      
      chartDatasets: [],
      chartOptions: {}
    }
  },
  watch: {
    'topPane.mode': {
       handler () {
         console.log('topPane mode updated')
         this.chartType = this.topPane.mode
       }
    }
  },
  methods: {
    async countItems (query = {}) {
      const service = this.$api.getService('documents')
      const response = await service.find({ query, $limit: 0 })
      return response.total
    }
  },
  beforeCreate () {
    // Load the required components
    this.$options.components['k-page'] = this.$load('layout/KPage')
    this.$options.components['k-chart'] = this.$load('frame/KChart')
  },
  async created () {
    const fieldName = 'etat_meca'
    this.chartLabels = ['sur', 'defectueux', 'rupture', 'danger']
    let data = []
    for (let i = 0; i < this.chartLabels.length; ++i) {
      data.push(await this.countItems({ [fieldName]: this.chartLabels[i] }))
    }
    this.chartDatasets.push({ label: fieldName, data })
  }
}
</script>
