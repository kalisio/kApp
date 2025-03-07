<template>
  <ComponentCard title="Labels" :code="KStampCode">
    <template v-for="(stamp, index) in stamps" :key="index">
      <KStamp v-bind="stamp" />
      <q-separator v-if="index !== stamps.length - 1" />
    </template>
  </ComponentCard>
</template>

<script setup>
import { ref } from 'vue';
import { KStampCode } from '../raw';
import ComponentCard from './ComponentCard.vue';

const stamps = ref([
  { direction: 'horizontal', text: 'message', textSize: '1.5rem' },
  { direction: 'horizontal', text: 'message', icon: 'las la-info-circle', iconSize: '1.2rem' },
  { direction: 'vertical', text: 'message', textSize: '1.5rem', icon: 'las la-info-circle', iconSize: '4rem' },
])
</script>