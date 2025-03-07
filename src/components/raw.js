// Code for the ComponentCard "code" field.
// We could make an API endpoint with fs to read the files and get the code that way.
// We could also maybe make a bash script that handles this.
// For now, they will be hardcoded in this file.

export const KStampCode = `<template v-for="(stamp, index) in stamps" :key="index">
  <KStamp v-bind="stamp" />
  <q-separator v-if="index !== stamps.length - 1" />
</template>

<script setup>
import { ref } from 'vue';

const stamps = ref([
  { direction: 'horizontal', text: 'message', textSize: '1.5rem' },
  { direction: 'horizontal', text: 'message', icon: 'las la-info-circle', iconSize: '1.2rem' },
  { direction: 'vertical', text: 'message', textSize: '1.5rem', icon: 'las la-info-circle', iconSize: '4rem' },
])
</script>
`;

export const KTextAreaCode =
  `<KTextArea text="TextArea" class="text-h1" />
<q-separator />
<KTextArea text="TextArea" />
`;

export const KDateCode = `<template>
  <KDate v-model="dateModel" :dense="dense" />
</template>

<script setup>
import { ref } from 'vue'

const dense = ref(false)
const dateModel = ref(null)
</script>
`;

export const KTimeCode = `<template>
  <KTime v-model="timeModel" format="HH:mm:ss" with-seconds :dense="dense" />
</template>

<script setup>
import { ref } from 'vue'

const dense = ref(false)
const timeModel = ref(null)
</script>
`;

export const KDateTimeCode = `<template>
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
</template>

<script setup>
import { ref } from 'vue'

const dense = ref(false)

const minDateTimeModel = ref(null)
const maxDateTimeModel = ref(null)
const dateTimeModel = ref(null)
</script>
`;

export const KDateTimeRangeCode = `<template>
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
</template>

<script setup>
import { ref } from 'vue'

const dense = ref(false)

const minDateTimeModel = ref(null)
const maxDateTimeModel = ref(null)
const dateTimeModel = ref(null)
const dateTimeRangeModel = ref(null)
</script>
`;