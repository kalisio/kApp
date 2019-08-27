<template>
  <div>
    <q-list>
      <q-separator />
      <!--
        Edit link
      -->
      <q-item id="open-editor" clickable @click="openEditor">
        <q-item-section avatar>
          <q-icon name="layers" />
        </q-item-section>
        <q-item-section>
          <q-item-label>
            {{ $t('sideNav.DEMO') }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script>
export default {
  name: 'demo',
  methods: {
    openEditor () {
      // Simply fire an event, it will be handled elsewhere to actually open the demo/custom editor
      this.$events.$emit('open-custom-editor')
    }
  }
}
</script>
