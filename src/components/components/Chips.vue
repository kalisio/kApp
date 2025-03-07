<template>
  <ComponentCard :title="$t('Chips.LABEL')" class="full-height">
    <div v-for="(chip, index) in chips" :key="index" class="q-gutter-sm">
      <div class="q-gutter-sm">
        <KChip v-bind="chip" v-if="isChipRemoved(chip)" @click="onChipSelected(chip)" @remove="chipRemoved = true" />
        <q-tooltip>
          {{ JSON.stringify(chip) }}
        </q-tooltip>
      </div>
      <q-separator v-if="index !== chips.length - 1" />
    </div>
  </ComponentCard>
</template>

<script setup>
import { ref } from 'vue';
import ComponentCard from './ComponentCard.vue';

const chipSelected = ref(false)
const chipRemoved = ref(false)

function onChipSelected(chip) {
  if (chip.selected !== undefined) {
    chipSelected.value = !chipSelected.value
  }
}

function isChipRemoved(chip) {
  if (chip.removable && chipRemoved.value) {
    return false
  }
  return true
}

const chips = ref([
  { label: 'Basic Chip' },
  { label: 'Icon chip', icon: 'las la-code' },
  { label: 'Color chip (primary)', color: 'primary' },
  { label: 'Color chip (#0492C2)', color: '#0492C2' },
  { label: 'Color chip (blue)', color: 'blue' },
  { label: 'Glossy chip', color: 'primary', class: 'glossy' },
  { label: 'Square chip', color: 'primary', square: true },
  { label: 'Outline chip', "text-color": 'primary', outline: true },
  { label: 'Selectable chip', color: 'primary', selected: chipSelected },
  { label: 'Removable chip', color: 'primary', removable: true },
])
</script>