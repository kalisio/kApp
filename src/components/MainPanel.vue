<template>
  <q-list link no-border>
    <q-item @click="onLogout()">
      <q-item-side icon="exit_to_app" />
      <q-item-main :label="$t('sideNav.LOGOUT')" />
    </q-item>
  </q-list>
</template>

<script>
import { QList, QItem, QItemSide, QItemMain, QItemSeparator } from 'quasar'

export default {
  name: 'main-panel',
  components: {
    QList,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator
  },
  methods: {
    onLogout () {
      this.$router.push({ name: 'logout'})
    }
  }
}
</script>

