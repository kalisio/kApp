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
    <!--
      Create editor
     -->
    <k-modal-editor
      id="editor"
      ref="editor"
      service="custom"
      objectId="custom"
      @applied="onUpdate" />
  </div>
</template>

<script>
export default {
  name: 'demo',
  methods: {
    openEditor () {
      this.$refs.editor.open()
    },
    async onUpdate (object) {
      this.$api.getService('custom').patch(0, { name: '' })
      this.$refs.editor.close()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-modal-editor'] = this.$load('editor/KModalEditor')
  }
}
</script>