<template>
  <q-list link no-border>
    <q-item @click="onLogout()" clickable v-ripple>
      <q-item-section avatar >
          <q-icon name="exit_to_app" />
      </q-item-section>
      <q-item-section>
        <q-item-label>{{ $t('sideNav.LOGOUT') }}</q-item-label>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script>
import { QList, QItem, QItemSection, QItemLabel, QIcon } from 'quasar'

export default {
  name: 'main-panel',
  components: {
    QList,
    QItem,
    QItemSection,
    QItemLabel,
    QIcon
  },
  methods: {
    onLogout () {
      this.$router.push({ name: 'logout'})
    }
  }
}
</script>

