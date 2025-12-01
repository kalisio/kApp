<template>
  <div style="max-width: 350px">
    <q-expansion-item
      class="text-weight-regular"
      v-model="expanded"
      icon="perm_identity"
      label="Others activities"
    >
      <KPanel
        id="profile-header"
        :content="activities"
        class="q-py-sm full-width justify-end no-wrap"
        @triggered="onTriggered"
      />
    </q-expansion-item>
  </div>
</template>

<script>
export default {
  props: {
    activities: {
      type: Array,
      default: () => []
    }
  },
}
</script>
