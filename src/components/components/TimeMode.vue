<template>
  <div class="row full-width justify-center q-gutter-sm">
    <!--
      KDate
      -->
    <ComponentCard title="KCard" :model="dateModel" class="q-pa-xs col-xs-12 col-sm-5 col-3">
      <KDate v-model="dateModel" :dense="dense" />
    </ComponentCard>
    <!--
      KTime
      -->
    <ComponentCard title="KTime" :model="timeModel" class="q-pa-xs col-xs-12 col-sm-5 col-3">
      <KTime v-model="timeModel" format="HH:mm:ss" with-seconds :dense="dense" />
    </ComponentCard>
    <!--
      KDateTime
      -->
    <ComponentCard title="KDateTime" :model="dateTimeModel" class="q-pa-xs col-xs-12 col-sm-10">
      <div class="column q-gutter-sm">
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">Min:</span>
          <KDateTime v-model="minDateTimeModel" :max="dateTimeModel" :dense="dense" date-class="text-caption"
            time-class="text-caption" />
        </div>
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">&nbsp;</span>
          <KDateTime v-model="dateTimeModel" :min="minDateTimeModel" :max="maxDateTimeModel" :dense="dense" />
        </div>
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">Max:</span>
          <KDateTime v-model="maxDateTimeModel" :min="dateTimeModel" :dense="dense" date-class="text-caption"
            time-class="text-caption" />
        </div>
      </div>
    </ComponentCard>
    <!--
      KDateTimeRange
      -->
    <ComponentCard title="KDateTimeRange" :model="JSON.stringify(dateTimeRangeModel)"
      class="q-pa-xs col-xs-12 col-sm-10">
      <div class="column q-gutter-sm">
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">Min:</span>
          <KDateTime v-model="minDateTimeModel" :max="dateTimeModel" :dense="dense" />
        </div>
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">&nbsp;</span>
          <KDateTimeRange v-model="dateTimeRangeModel" :min="minDateTimeModel" :max="maxDateTimeModel" :icon="null"
            :dense="dense" />
        </div>
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">&nbsp;</span>
          <KDateTimeRange v-model="dateTimeRangeModel" :min="minDateTimeModel" :max="maxDateTimeModel" :icon="null"
            :slider="{ stacked: dense ? true : false }" :dense="dense" class="full-width" />
        </div>
        <div class="row items-center no-wrap">
          <span style="min-width: 30px;">Max:</span>
          <KDateTime v-model="maxDateTimeModel" :min="dateTimeModel" :dense="dense" id="slider-range-max" />
        </div>
      </div>
    </ComponentCard>
  </div>
</template>

<script setup>
import { composables as kdkCoreComposables } from '@kalisio/kdk/core.client'
import { ref } from 'vue'
import ComponentCard from './ComponentCard.vue'

// Data
const { dense } = kdkCoreComposables.useScreen()
const dateModel = ref(null)
const timeModel = ref(null)
const minDateTimeModel = ref(null)
const maxDateTimeModel = ref(null)
const dateTimeModel = ref(null)
const dateTimeRangeModel = ref(null)
</script>
