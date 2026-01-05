<template>
  <div class="column full-height">
    <div class="col q-mb-md">
      <ComponentCard title="KAvatar" class="full-height full-width">
        <KAvatar :subject="avatar" size="7rem" />
        <q-tooltip>
          {"size":"7rem"}
        </q-tooltip>
      </ComponentCard>
    </div>
    <div class="col-auto q-mb-md">
      <ComponentCard title="KLogo" class="full-height">
        <KLogo />
      </ComponentCard>
    </div>
    <div class="col-auto">
      <ComponentCard title="KSponsor">
        <KSponsor />
      </ComponentCard>
    </div>
  </div>
</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client'
import { KAvatar, KLogo, KSponsor } from '@kalisio/kdk/core/client/components'
import { computed } from 'vue'
import ComponentCard from './ComponentCard.vue'

const User = Store.getRef('user')
const avatar = computed(() => _.get(User.value, 'profile', {}))
</script>