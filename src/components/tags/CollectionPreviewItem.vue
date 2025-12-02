<template>
  <KItem
    v-bind="$props"
    :actions="itemActions"
    :dense="dense"
    class="items-center k-collection-preview-item"
  >
    <template #item-content>
      <div class="row items-center no-wrap" :class="gutterClass">
        <div class="text-subtitle2">
          <div>{{ name }}</div>

          <div>
            <q-badge
              v-for="tag in tags"
              :key="tag.name"
              class="q-mx-xs"
              :style="{ backgroundColor: tag.color }"
              :text-color="getTextColor(tag)"
            >
              {{ tag.name }}
            </q-badge>
          </div>
        </div>
      </div>
    </template>
  </KItem>
</template>

<script>

import {
  mixins as kdkCoreMixins,
  utils as kdkCoreUtils
} from '@kalisio/kdk/core.client'

export default {
  mixins: [kdkCoreMixins.baseItem],
  //components: { KItem },

  props: {
    dense: { type: Boolean, default: true }
  },

  computed: {
    name () {
      return this.item.name
    },
    tags () {
      return this.item.tags || []
    },
    gutterClass () {
      return this.dense ? 'q-gutter-x-sm' : 'q-gutter-x-md'
    }
  },

  methods: {
    getTextColor (tag) {
      return kdkCoreUtils.getContrastColor(tag.color || '#FFFFFF')
    }
  }
}
</script>

<style lang="scss">
.k-collection-preview-item:hover {
  background: $grey-3 !important;
}
</style>
