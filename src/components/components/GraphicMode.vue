<template>
  <Shapes />
  <ColorScales />
  <Chips />
  <KAvatar
        :subject="avatar"
        size="7rem"
      />
  <KContent>
    <h1>test</h1>
  </KContent> 
  <KLogo />
  <KSponsor />
  <KRibbon />
</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client'
import { KAvatar, KContent, KLogo, KSponsor } from '@kalisio/kdk/core/client/components'
import { KRibbon } from '@kalisio/kdk/core/client/components/media'
import { computed } from 'vue'
import Chips from './Chips.vue'
import ColorScales from './ColorScales.vue'
import Shapes from './Shapes.vue'

const User = Store.getRef('user')
const avatar = computed(() => _.get(User.value, 'profile', {}))
</script>