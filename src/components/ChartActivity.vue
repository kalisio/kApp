<template>
  <k-page padding>
    <template v-slot:page-content>
      <!--
        Chart rendering
      -->
      <div class="q-pa-lg row justify-center">
        <q-option-group
          v-model="currentField"
          :options="fieldOptions"
          inline />
        <k-chart class="q-pa-lg" :config="chartConfig" style="width: 90vw; height: 75vh" />
      </div>
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
import { QOptionGroup } from 'quasar'
import { Chart, PointElement, LineElement, BarElement, ArcElement, BarController, 
         LineController, PieController, CategoryScale, LinearScale } from 'chart.js';

Chart.register(
  PointElement,
  ArcElement,
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
  components: {
    QOptionGroup
  },
  mixins: [kCoreMixins.baseActivity()],
  computed: {
    chartConfig () {
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
         this.chartOptions = {}
       }
    },
    currentField: {
      async handler () {
        this.chartLabels = this.fieldLabels[this.currentField]
        let data = []
        for (let i = 0; i < this.chartLabels.length; ++i) {
          data.push(await this.countItems({ [this.currentField]: this.chartLabels[i] }))
        }
        this.chartDatasets = [{ label: this.currentField, data, colorScale: 'YlGnBu' }]
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
    this.fieldLabels = {
      'etat_sani': ['sain', 'malade', 'declin'],
      'etat_meca': ['sur', 'defectueux', 'rupture', 'danger']
    },
    this.currentField = 'etat_sani'
  }
}
</script>
