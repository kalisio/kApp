<template>
  <KActivity
    name="tagged-collections"
    :options="{
      selection: false,
      state: { tagsFilter: { selection: [] } }
    }"
  >
    <div class="fit full-width row no-wrap">
      <div v-if="wide" class="col-1" />

      <KGrid
        service="documents"
        :append-items="true"
        :base-query="baseQuery"
        :filter-query="filterQuery"
        :renderer="renderer"
        :nbItemsPerPage="24"
        class="full-width"
      >
        <template #empty>
          <KStamp
            icon="las la-exclamation-circle"
            icon-size="4rem"
            :text="$t('KGrid.EMPTY_LABEL')"
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
import { computed, onMounted } from 'vue'
import config from 'config'
import {
  api,
  Filter,
  Sorter,
  composables as kdkCoreComposables,
  utils as kdkCoreUtils
} from '@kalisio/kdk/core.client'

// UI / Layout
const { wide } = kdkCoreComposables.useScreen()
const { CurrentActivityContext } = kdkCoreComposables.useCurrentActivity()

// Renderer (item + actions)
const renderer = {
  component: 'tags/CollectionPreviewItem',
  actions: _.get(config, 'taggedCollectionsActivity.items.actions'),
  inline: true,
  options: { avatar: false },
  class: 'q-pt-sm col-12'
}


// Queries
const baseQuery = computed(() => Sorter.get().query || { $sort: { createdAt: -1 } })

const filterQuery = computed(() => {
  const tagsSelection = _.get(CurrentActivityContext, 'state.tagsFilter.selection', [])

  if (!tagsSelection.length) return Filter.get().query

  return {
    ...Filter.get().query,
    'tags.name': { $in: tagsSelection.map(t => t.name) }
  }
})

// Lifecycle
onMounted(async () => {
  _.set(
    CurrentActivityContext,
    'state.tagsFilter.options',
    await kdkCoreUtils.getTagsFilterOptions('collections')
  )
})

// Expose
defineExpose({ can: api.can })
</script>
