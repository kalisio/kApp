<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">{{ $t('Stamps.LABEL') }}</th>
      </tr>
    </thead>
    <tbody>
      <template v-for="(stamp, index) in stamps" :key="index">
        <tr>
          <td>
            <KStamp v-bind="stamp" />
          </td>
        </tr>
      </template>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { ref } from 'vue'

const stamps = ref([
  { direction: 'horizontal', text: 'message', textSize: '1.5rem' },
  { direction: 'horizontal', text: 'message', icon: 'las la-info-circle', iconSize: '1.2rem' },
  { direction: 'vertical', text: 'message', textSize: '1.5rem', icon: 'las la-info-circle', iconSize: '4rem' },
])
</script>