<template>
  <ComponentCard title="Brand/Logos" class="full-height">
    <div class="row full-width items-center text-center">
      <p class="col-5">KAvatar</p>
      <div class="col">
        <KAvatar :subject="avatar" size="7rem" />
        <q-tooltip>
          {"size":"7rem"}
        </q-tooltip>
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row">
      <p class="col-5">KLogo</p>
      <div class="col">
        <KLogo />
      </div>
    </div>
    <q-separator class="q-my-md" />
    <div class="row">
      <p class="col-5">KSponsor</p>
      <div class="col">
        <KSponsor />
      </div>
    </div>
  </ComponentCard>

</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client';
import { KAvatar, KLogo, KSponsor } from '@kalisio/kdk/core/client/components';
import { computed } from 'vue';
import ComponentCard from './ComponentCard.vue';

const User = Store.getRef('user')
const avatar = computed(() => _.get(User.value, 'profile', {}))
</script>