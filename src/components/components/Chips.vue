<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">{{ $t('Chips.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(chip, index) in chips" :key="index">
        <tr>
          <td>
            <KChip v-bind="chip" v-if="isChipRemoved(chip)" @click="onChipSelected(chip)" @remove="chipRemoved = true" />
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue';

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
  { label: 'Color chip', color: 'primary' },
  { label: 'Glossy chip', color: 'primary', class: 'glossy' },
  { label: 'Square chip', color: 'primary', square: true },
  { label: 'Outline chip', "text-color": 'primary', outline: true },
  { label: 'Selectable chip', color: 'primary', selected: chipSelected },
  { label: 'Removable chip', color: 'primary', removable: true },
])
</script>