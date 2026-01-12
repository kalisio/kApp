<template>
  <KActivity
    :ref="activityCreated"
    name="board"
  >
    <KBoard 
      v-if="categories" 
      :columns="columns"
      class="q-pt-sm"
    />
    <!-- Enable modal -->
    <router-view service="documents" />
  </KActivity>
</template>

<script setup>
import _ from 'lodash'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'

// Data
const $q = useQuasar()
const categories = ref(null)
const categoryField = ref(null)

// Computed
const columnWidth = computed(() => {
  if ($q.screen.lt.md) return 280
  if ($q.screen.lt.lg) return 360
  if ($q.screen.lt.xl) return 440
  return 500
})
console.log('toto')
const renderer = computed(() => {
  return {
    component: 'collection/KCard',
    class: 'q-py-xs col-12',
    style: { minWidth: columnWidth.value + 'px', maxWidth: columnWidth.value + 'px' },
    actions: [
      {
        id: 'view-document',
        icon: 'las la-glasses',
        tooltip: 'KanbanActivity.VIEW_DOCUMENT',
        handler: (context) => this.$router.push({ name: 'view-document', params: { page: 'list', objectId: context.item._id } })
      }
    ]
  }
})
const columns = computed(() => {
  return [{
    label: 'Sain',
    value: 'todo',
    props: {
      service: 'documents',
      renderer: _.cloneDeep(renderer.value),
      baseQuery: Object.assign({ etat_sani: 'sain' })
    }
  }, {
    label: 'Malade',
    value: 'doing',
    props: {
      service: 'documents',
      renderer: _.cloneDeep(renderer.value),
      baseQuery: Object.assign({ etat_sani: 'malade' })
    }
  }, {
    label: 'Declin',
    value: 'done',
    props: {
      service: 'documents',
      renderer: _.cloneDeep(renderer.value),
      baseQuery: Object.assign({ etat_sani: 'declin' })
    }
  }]
})

// Functions
function activityCreated (ref) {
  if (ref) {
    const options = ref.getOptions()
    categoryField.value = _.get(options, 'categoryField')
    categories.value = _.get(options, 'categories')
  }
}
</script>


