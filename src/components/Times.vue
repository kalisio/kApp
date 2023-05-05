<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="3">{{ $t('Times.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>
          KDate
        </td>
        <td>
          <KDate 
            v-model="dateModel" 
            :options="dateOptions"
          />
        </td>
        <td>
          {{ dateModel }}
        </td>
      </tr>
      <tr>
        <td>
          KTime
        </td>
        <td>
          <KTime 
            v-model="timeModel" 
            :options="timeOptions"
          />
        </td>
        <td>
          {{ timeModel }}
        </td>
      </tr>
      <tr>
        <td>
          KDateTime
        </td>
        <td>
          <KDateTime 
            v-model="dateTimeModel" 
            :options="dateTimeOptions"
            :min="minDateTime()" 
            :max="maxDateTime()"
          />
        </td>
        <td>
          {{ dateTimeModel }}
        </td>
      </tr>
      <tr>
        <td>
          KDateTimeRange
        </td>
        <td>
          <KDateTimeRange 
            v-model="dateTimeRangeModel" 
            :options="dateTimeRangeOptions" 
            :min="minDateTime()" 
            :max="maxDateTime()"
            dense
          />
        </td>
        <td>
          {{ dateTimeRangeModel }}
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import moment from 'moment'
import { ref } from 'vue'

// Data
const dateModel = ref(null)
const dateOptions = {
  icon: 'las la-calendar',
  helper: 'Pick a date',
  format: 'DD/MM/YYYY'
}
const timeModel = ref(null)
const timeOptions = ref({
  icon: 'las la-clock',
  helper: 'Pick a time',
  format: 'HH:mm:ss',
  picker: {
    withSeconds: true
  }
})
const dateTimeModel = ref(null)
const dateTimeOptions = ref({
  date: {
    icon: 'las la-calendar',
    format: 'DD/MM/YYYY'
  },
  time: {
    format: 'HH:mm:ss',
    picker: {
      withSeconds: true
    }
  }
})
const dateTimeRangeModel = ref(null)
const dateTimeRangeOptions = ref({
  date: {
    icon: 'las la-calendar',
    format: 'DD/MM/YYYY'
  }
})

// Functions
function minDateTime () {
  const now = moment()
  return now.subtract(1, 'week').toISOString()
}
function maxDateTime () {
  const now = moment()
  return now.add(1, 'week').toISOString()
}
</script>

<style lang="scss">
.span {
  background-color: red;
}
</style>