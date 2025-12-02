<template>
  <q-expansion-item
    class="text-weight-regular"
    v-model="expanded"
    icon="las la-tags"
    label="Tags activities"
  >
    <KPanel
      id="profile-header"
      :content="activities"
      class="q-py-sm full-width justify-end no-wrap"
      direction="vertical"
      @triggered="onTriggered"
    />
  </q-expansion-item>
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
