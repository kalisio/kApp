<template>
  <div class="q-pa-md">
    <div class="q-mb-md text-h6">
      Your device
    </div>
    <q-markup-table>
      <thead>
        <th class="text-left">Browser User Agent</th>
      </thead>
      <tbody>
        <td>{{ $q.platform.userAgent }}</td>
      </tbody>
    </q-markup-table>

    <q-markup-table>
      <thead>
        <tr>
          <th class="text-left">Property</th>
          <th class="text-left">Value</th>
        </tr>
      </thead>

      <tbody>
        <tr v-for="(value, prop) in $q.platform.is" :key="prop">
          <td>{{ prop }}</td>
          <td>{{ value }}</td>
        </tr>
      </tbody>
    </q-markup-table>
  </div>
</template>

<script>
export default {
  name: 'device-info'
}
</script>

