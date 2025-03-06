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
<\/script>`;

export const KTextAreaCode =
  `<KTextArea text="TextArea" class="text-h1" />
<q-separator />
<KTextArea text="TextArea" />`

export const KDateCode = `<template>
  <q-btn v-bind="computedButton">
    <q-popup-proxy>
      <q-date
        id="date-picker"
        v-model="computedModel"
        v-bind="computedPicker"
      />
    </q-popup-proxy>
  </q-btn>
</template>

<script setup>
import _ from 'lodash'
import moment from 'moment'
import { computed } from 'vue'
import { Time } from '../../time.js'
import { i18n } from '../../i18n.js'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  picker: {
    type: Object,
    default: () => null
  },
  format: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: 'las la-calendar'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Data
const mask = 'YYYY/MM/DD'

// Computed
const computedModel = computed({
  get: function () {
    return props.modelValue
  },
  set: function (value) {
    emit('update:modelValue', value)
  }
})
const computedButton = computed(() => {
  // compute format
  let format = props.format
  if (_.isEmpty(format)) {
    const dateFormat = _.get(Time.getFormat(), 'date.short')
    const yearFormat = _.get(Time.getFormat(), 'year.long')
    format = \`\${dateFormat}/\${yearFormat}\`
  }
  // compute label
  let label
  if (!_.isEmpty(computedModel.value)) label = moment(computedModel.value, mask).format(format)
  else label = i18n.tie(props.placeholder)
  // define button spec
  const spec = {
    id: 'date-button',
    label,
    flat: true,
    noCaps: true,
    disable: props.disabled,
    dense: true,
    class: props.dense ? 'q-px-xs' : 'q-pa-sm'
  }
  // add icon if defined
  if (props.icon) spec.icon = props.icon
  return spec
})
const computedPicker = computed(() => {
  const picker = { mask }
  return _.merge({}, props.picker, picker)
})

// Immediate
if (_.isEmpty(props.modelValue) &&
    _.isEmpty(props.placeholder)) computedModel.value = moment.utc().format(mask)
</script>
`;

export const KTimeCode = `<template>
  <q-btn v-bind="computedButton">
    <q-popup-proxy>
      <q-time
        id="time-picker"
        v-model="computedModel"
        v-bind="computedPicker"
      />
    </q-popup-proxy>
  </q-btn>
</template>

<script setup>
import _ from 'lodash'
import moment from 'moment'
import { computed } from 'vue'
import { Time } from '../../time.js'
import { i18n } from '../../i18n.js'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: null
  },
  picker: {
    type: Object,
    default: () => null
  },
  withSeconds: {
    type: Boolean,
    default: false
  },
  format: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: 'las la-clock'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Data
const mask = 'HH:mm:ss'

// Computed
const computedModel = computed({
  get: function () {
    return props.modelValue
  },
  set: function (value) {
    emit('update:modelValue', value)
  }
})
const computedButton = computed(() => {
  // compute format
  let format = props.format
  if (_.isEmpty(format)) format = _.get(Time.getFormat(), 'time.long')
  // compute label
  let label
  if (!_.isEmpty(computedModel.value)) label = moment(computedModel.value, mask).format(format)
  else label = i18n.tie(props.placeholder)
  // define button spec
  const spec = {
    id: 'time-button',
    label,
    flat: true,
    noCaps: true,
    disable: props.disabled,
    dense: true,
    class: props.dense ? 'q-px-xs' : 'q-pa-sm'
  }
  // add icon if defined
  if (props.icon) spec.icon = props.icon
  return spec
})
const computedPicker = computed(() => {
  const picker = {
    mask,
    withSeconds: props.withSeconds
  }
  return _.merge({}, props.picker, picker)
})

// Immediate
if (_.isEmpty(props.modelValue) &&
    _.isEmpty(props.placeholder)) computedModel.value = moment.utc().format(mask)
</script>
`;

export const KDateTimeCode = `<template>
  <div
    class="row items-center no-wrap"
    :class="{ 'q-gutter-x-xs': dense }"
  >
    <!-- Date -->
    <KDate
      v-model="computedDateModel"
      :picker="computedDatePicker"
      :format="dateFormat"
      :placeholder="placeholder"
      :icon="icon"
      :disabled="disabled" 
      :dense="dense"
      :class="{ 'q-pl-xs': dense, 'q-pl-md': !dense, [dateClass]: true }"
    />
    <!-- Separator -->
    <div v-if="separator">{{ separator }}</div>
    <!-- Time -->
    <KTime
      v-model="computedTimeModel"
      :picker="computedTimePicker"
      :with-seconds="withSeconds"
      :format="timeFormat"
      :icon="null"
      :disabled="disabled || dateTime === null"
      :dense="dense"
      :class="{ 'q-pr-xs': dense, 'q-pr-md': !dense, [timeClass]: true }"
    />
  </div>
</template>

<script setup>
import _ from 'lodash'
import moment from 'moment'
import { ref, computed, watch } from 'vue'
import { toLocalTimezone } from '../../utils/utils.time.js'
import { Time } from '../../time.js'
import KDate from './KDate.vue'
import KTime from './KTime.vue'

// Props
const props = defineProps({
  modelValue: {
    type: String,
    default: () => null,
    validator: (value) => {
      if (value) return moment(value).isValid()
      return true
    }
  },
  datePicker: {
    type: Object,
    default: () => null
  },
  timePicker: {
    type: Object,
    default: () => null
  },
  withSeconds: {
    type: Boolean,
    default: false
  },
  dateFormat: {
    type: String,
    default: null
  },
  timeFormat: {
    type: String,
    default: null
  },
  dateClass: {
    type: String,
    default: ''
  },
  timeClass: {
    type: String,
    default: ''
  },
  separator: {
    type: String,
    default: '-'
  },
  min: {
    type: String,
    default: () => null,
    validator: (value) => {
      if (value) return moment(value).isValid()
      return true
    }
  },
  max: {
    type: String,
    default: () => null,
    validator: (value) => {
      if (value) return moment(value).isValid()
      return true
    }
  },
  timezone: {
    type: String,
    default: null
  },
  placeholder: {
    type: String,
    default: null
  },
  icon: {
    type: String,
    default: 'las la-calendar'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Data
const dateTime = ref(null)
const minDateTime = ref(null)
const maxDateTime = ref(null)
const dateMask = 'YYYY/MM/DD'
const timeMask = 'HH:mm:ss'

// Computed
const computedDateModel = computed({
  get: function () {
    return dateTime.value ? dateTime.value.format(dateMask) : null
  },
  set: function (value) {
    const { YYYY, MM, DD } = toYMD(value)
    if (!dateTime.value) dateTime.value = moment({ year: YYYY, month: MM, date: DD })
    else dateTime.value.set({ year: YYYY, month: MM, date: DD })
    emit('update:modelValue', dateTime.value.toISOString())
  }
})
const computedTimeModel = computed({
  get: function () {
    return dateTime.value ? dateTime.value.format(timeMask) : null
  },
  set: function (value) {
    const { HH, mm, ss } = toHMS(value)
    dateTime.value.set({ hour: HH, minute: mm, second: ss })
    emit('update:modelValue', dateTime.value.toISOString())
  }
})
const computedDatePicker = computed(() => {
  let picker = {}
  if (!_.isEmpty(props.min) || !_.isEmpty(props.max)) picker = { options: checkDate }
  return _.merge({}, props.datePicker, picker)
})
const computedTimePicker = computed(() => {
  let picker = {}
  if (!_.isEmpty(props.min) || !_.isEmpty(props.max)) picker = { options: checkTime }
  return _.merge({}, props.timePicker, picker)
})

// Watch
watch(() => props.modelValue, (value) => {
  dateTime.value = toLocalTimezone(props.modelValue, Time.getFormatTimezone())
})
watch(() => props.timezone, (value) => {
  dateTime.value = toLocalTimezone(props.modelValue, Time.getFormatTimezone())
  minDateTime.value = toLocalTimezone(props.min, Time.getFormatTimezone())
  maxDateTime.value = toLocalTimezone(props.max, Time.getFormatTimezone())
})
watch(() => props.min, (value) => {
  minDateTime.value = toLocalTimezone(props.min, Time.getFormatTimezone())
})
watch(() => props.max, (value) => {
  maxDateTime.value = toLocalTimezone(props.max, Time.getFormatTimezone())
})

// Functions
function checkDate (date) {
  const { YYYY, MM, DD } = toYMD(date)
  const dateToCheck = moment({
    year: YYYY,
    month: MM,
    date: DD,
    hour: dateTime.value ? dateTime.value.hour() : 0,
    minute: dateTime.value ? dateTime.value.minute() : 0
  })
  if (dateToCheck.isBefore(minDateTime.value)) return false
  if (dateToCheck.isAfter(maxDateTime.value)) return false
  return true
}
function checkTime (hours, minutes, seconds) {
  if (minDateTime.value) {
    const maxTimeToCheck = moment({
      year: dateTime.value.year(),
      month: dateTime.value.month(),
      date: dateTime.value.date(),
      hour: Number(hours),
      minute: Number(minutes) || 59,
      second: Number(seconds) || 59
    })
    if (maxTimeToCheck.isBefore(minDateTime.value)) return false
  }
  if (maxDateTime.value) {
    const minTimeToCheck = moment({
      year: dateTime.value.year(),
      month: dateTime.value.month(),
      date: dateTime.value.date(),
      hour: Number(hours),
      minute: Number(minutes) || 0,
      second: Number(seconds) || 0
    })
    if (minTimeToCheck.isAfter(maxDateTime.value)) return false
  }
  return true
}

// Functions
function toYMD (value) {
  return {
    YYYY: value.substring(0, 4),
    MM: value.substring(5, 7) - 1,
    DD: value.substring(8, 10)
  }
}
function toHMS (value) {
  return {
    HH: value.substring(0, 2),
    mm: value.substring(3, 5),
    ss: value.substring(6, 8)
  }
}

// Immediate
if (props.modelValue) dateTime.value = toLocalTimezone(props.modelValue, Time.getFormatTimezone())
if (props.min) minDateTime.value = toLocalTimezone(props.min, Time.getFormatTimezone())
if (props.max) maxDateTime.value = toLocalTimezone(props.max, Time.getFormatTimezone())
</script>
`;

export const KDateTimeRangeCode = `<template>
  <div
    class="column"
  >
    <div class="full-width row items-center justify-between no-wrap">
      <!-- Start dateTime -->
      <KDateTime
        v-model="startTimeModel"
        :date-picker="datePicker"
        :time-picker="timePicker"
        :date-format="dateFormat"
        :time-format="timeFormat"
        :date-class="dateClass"
        :time-class="timeClass"
        :separator="dateTimeSeparator"
        :min="min"
        :max="endTimeModel"
        :timezone="timezone"
        :icon="icon"
        :disabled="disabled"
        :dense="dense"
        @update:modelValue="onRangeChanged"
      />
      <div v-if="canDisplaySlider"
        class="col q-px-sm"
      >
        <Teleport v-if="isMounted"
          to="#responsive-range-container"
          :disabled="!slider.stacked"
        >
          <q-range
            v-model="rangeModel"
            v-bind="props.slider"
            :disable="min === max"
            dense
            class="q-px-sm full-width"
            @update:model-value="onSliderUpdated()"
            @change="onSliderChanged()"
          />
        </Teleport>
      </div>
      <div v-else>
        {{ separator }}
      </div>
      <!-- End dateTime -->
      <KDateTime
        v-model="endTimeModel"
        :date-picker="datePicker"
        :time-picker="timePicker"
        :date-format="dateFormat"
        :time-format="timeFormat"
        :date-class="dateClass"
        :time-class="timeClass"
        :separator="dateTimeSeparator"
        :min="startTimeModel"
        :max="max"
        :timezone="timezone"
        :icon="icon"
        :disabled="disabled"
        :dense="dense"
        @update:modelValue="onRangeChanged"
      />
    </div>
    <div v-if="canDisplaySlider"
      id="responsive-range-container"
    >
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import moment from 'moment'
import { ref, computed, watch, onMounted } from 'vue'
import KDateTime from './KDateTime.vue'

// Props
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => null,
    validator: (value) => {
      if (value && value.start && !moment(value.start).isValid()) return false
      if (value && value.end && !moment(value.end).isValid()) return false
      return true
    }
  },
  datePicker: {
    type: Object,
    default: () => null
  },
  timePicker: {
    type: Object,
    default: () => null
  },
  withSeconds: {
    type: Boolean,
    default: false
  },
  dateFormat: {
    type: String,
    default: null
  },
  timeFormat: {
    type: String,
    default: null
  },
  dateClass: {
    type: String,
    default: ''
  },
  timeClass: {
    type: String,
    default: ''
  },
  separator: {
    type: String,
    default: '/'
  },
  dateTimeSeparator: {
    type: String,
    default: '-'
  },
  min: {
    type: String,
    default: () => null,
    validator: (value) => {
      if (value) return moment(value).isValid()
      return true
    }
  },
  max: {
    type: String,
    default: () => null,
    validator: (value) => {
      if (value) return moment(value).isValid()
      return true
    }
  },
  timezone: {
    type: String,
    default: null
  },
  slider: {
    type: Object,
    default: () => null
  },
  icon: {
    type: String,
    default: 'las la-calendar'
  },
  disabled: {
    type: Boolean,
    default: false
  },
  dense: {
    type: Boolean,
    default: false
  }
})

// Emits
const emit = defineEmits(['update:modelValue'])

// Data
const startTimeModel = ref(null)
const endTimeModel = ref(null)
const rangeModel = ref({
  min: 0,
  max: 100
})
const isMounted = ref(false)

// Computed
const canDisplaySlider = computed(() => {
  return !_.isEmpty(props.slider) &&
         !_.isEmpty(props.min) &&
         !_.isEmpty(props.max)
})

// Watch
watch(() => props.modelValue, (value) => {
  if (value) {
    startTimeModel.value = value.start
    endTimeModel.value = value.end
  }
})
watch(() => props.min, (newValue, oldValue) => {
  if (_.isEmpty(props.max)) return
  if (rangeModel.value.min === 0) startTimeModel.value = newValue
  else {
    const min = moment(props.min)
    const max = moment(props.max)
    const start = moment(startTimeModel.value)
    const duration = moment.duration(max.diff(min)).asMilliseconds()
    if (duration > 0) rangeModel.value.min = 100 * moment.duration(start.diff(min)).asMilliseconds() / duration
    else rangeModel.value.min = 0
  }
  emit('update:modelValue', { start: startTimeModel.value, end: endTimeModel.value })
})
watch(() => props.max, (newValue, oldValue) => {
  if (_.isEmpty(props.min)) return
  if (rangeModel.value.max === 100) endTimeModel.value = newValue
  else {
    const min = moment(props.min)
    const max = moment(props.max)
    const end = moment(endTimeModel.value)
    const duration = moment.duration(max.diff(min)).asMilliseconds()
    if (duration > 0) rangeModel.value.max = 100 * moment.duration(end.diff(min)).asMilliseconds() / duration
    else rangeModel.value.max = 100
  }
  emit('update:modelValue', { start: startTimeModel.value, end: endTimeModel.value })
})

// Functions
function onRangeChanged () {
  if (!_.isEmpty(props.min && !_.isEmpty(props.max))) {
    const min = moment(props.min)
    const max = moment(props.max)
    const start = moment(startTimeModel.value)
    const end = moment(endTimeModel.value)
    const duration = moment.duration(max.diff(min)).asMilliseconds()
    if (duration > 0) {
      rangeModel.value.min = 100 * moment.duration(start.diff(min)).asMilliseconds() / duration
      rangeModel.value.max = 100 * moment.duration(end.diff(min)).asMilliseconds() / duration
    } else {
      rangeModel.value.min = 0
      rangeModel.value.max = 100
    }
  }
  emit('update:modelValue', { start: startTimeModel.value, end: endTimeModel.value })
}
function onSliderUpdated () {
  const min = moment(props.min)
  const max = moment(props.max)
  const duration = moment.duration(max.diff(min)).asMilliseconds()
  if (duration > 0) {
    startTimeModel.value = min.add(rangeModel.value.min / 100 * duration).toISOString()
    endTimeModel.value = max.subtract((1 - rangeModel.value.max / 100) * duration).toISOString()
  } else {
    startTimeModel.value = props.min
    endTimeModel.value = props.max
  }
}
function onSliderChanged () {
  emit('update:modelValue', { start: startTimeModel.value, end: endTimeModel.value })
}

// Hooks
onMounted(() => {
  isMounted.value = true
})

// Immediate
if (props.modelValue) {
  startTimeModel.value = props.modelValue.start
  endTimeModel.value = props.modelValue.end
  onRangeChanged()
}
</script>
`;