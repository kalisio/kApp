<template>
  <KActivity
    name="tags"
    :options="{
      selection: false
    }"
  >
    <div class="fit full-width row no-wrap">
      <div v-if="wide" class="col-1" />
      <KGrid
        service="tags"
        :append-items="true"
        :base-query="baseQuery"
        :filter-query="filterQuery"
        :renderer="tagRenderer"
        :nbItemsPerPage="24"
        class="full-width"
      >
        <template v-slot:empty>
          <KStamp
            icon="las la-exclamation-circle"
            icon-size="4rem"
            :text="$t('KGrid.EMPTY_LABEL')"
            text-size="1.2rem"
            direction="vertical"
            class="fixed-center"
          />
        </template>
      </KGrid>
      <div v-if="wide" class="col-1" />
    </div>
  </KActivity>
</template>

<script setup>
import _ from 'lodash'
import config from 'config'
import { computed } from 'vue'
import { api, Filter, Sorter, composables as kdkCoreComposables } from '@kalisio/kdk/core.client'

// Data
const { wide } = kdkCoreComposables.useScreen()
const tagRenderer ={
    component: 'tags/KTagItem',
    actions: _.get(config, 'tagsActivity.items.actions'),
    inline: true,
    options: { avatar: false },
    class: 'q-pt-sm col-12'
}

// Computed
const baseQuery = computed(() => {
  return Sorter.get().query || { $sort: { createdAt: -1 } }
})
const filterQuery = computed(() => {
  return Filter.get().query
})


// Expose
defineExpose({
  can: api.can
})
</script>
