<template>
  <div class="row full-width q-gutter-x-md q-my-md justify-center">
    <Shapes />
    <ColorScales />
    <Chips />
  </div>
  <div class="row full-width q-gutter-x-md justify-center">
    <KAvatar :subject="avatar" size="7rem" />
  <KLogo />
  </div>
  
  <KSponsor />
  <!-- Je vais éviter de mettre KVersion, à cause des tests -->
  <!-- <KVersion /> -->
</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client'
import { KAvatar, KLogo, KSponsor } from '@kalisio/kdk/core/client/components'
import { computed } from 'vue'
import Chips from './Chips.vue'
import ColorScales from './ColorScales.vue'
import Shapes from './Shapes.vue'

const User = Store.getRef('user')
const avatar = computed(() => _.get(User.value, 'profile', {}))
</script>