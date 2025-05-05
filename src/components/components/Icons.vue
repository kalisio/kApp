<template>
  <ComponentCard :title="$t('Icons.LABEL')" class="full-height">
    <div v-for="(icon, index) in icons" :key="index" class="q-gutter-sm">
      <div class="q-gutter-sm">
        <KIcon v-bind="icon" />
        <q-tooltip>
          {{ JSON.stringify(icon) }}
        </q-tooltip>
      </div>
      <q-separator v-if="index !== icons.length - 1" />
    </div>
  </ComponentCard>
</template>

<script setup>
import { ref } from 'vue'
import ComponentCard from './ComponentCard.vue'

const icons = ref([
  { icon: 'las la-home' },
  { icon: { name: 'las la-home', size: 'lg', color: '#FFA500' } },
  { icon: { name: 'las la-home', size: 'xl', color: '#FF9988', overlay: { name: 'las la-slash', size: 'xl', color: '#FF0000', rotation: 90 } } }
])
</script>