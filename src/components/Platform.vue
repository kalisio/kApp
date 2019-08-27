<template>
  <div class="q-pa-md">
    <div class="q-mb-md text-h6">
      {{ $t('Platform.TITLE') }}
    </div>
    <q-markup-table>
      <thead class="bg-secondary text-white">
        <th class="text-left">{{ $t('Platform.USER_AGENT') }}</th>
      </thead>
      <tbody>
        <td>{{ $q.platform.userAgent }}</td>
      </tbody>
    </q-markup-table>
    <q-markup-table>
      <thead class="bg-secondary text-white">
        <tr>
          <th class="text-left" colspan="2">{{ $t('Platform.BROWSER') }}</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(value, prop) in $q.platform.is" :key="prop">
          <td>{{ prop }}</td>
          <td>{{ value === true ? $t('YES') : value }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: 'device-info',
  methods: {
    isCordova () {
      if (window.cordova) return true
    }
  }
}
</script>
