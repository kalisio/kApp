<template>
  <q-markup-table>
    <thead class="bg-accent text-white">
      <tr>
        <th class="text-left" colspan="2">Brand/Logos</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>KAvatar</td>
        <td>
          <KAvatar :subject="avatar" size="7rem" />
          <q-tooltip>
            {"size":"7rem"}
          </q-tooltip>
        </td>
      </tr>
      <tr>
        <td>KLogo</td>
        <td>
          <KLogo />
        </td>
      </tr>
      <tr>
        <td>KSponsor</td>
        <td>
          <KSponsor />
        </td>
      </tr>
    </tbody>
  </q-markup-table>
</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client';
import { KAvatar, KLogo, KSponsor } from '@kalisio/kdk/core/client/components';
import { computed } from 'vue';

const User = Store.getRef('user')
const avatar = computed(() => _.get(User.value, 'profile', {}))
</script>