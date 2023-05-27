<template>
  <KPage padding @content-resized="onPageContentResized">
    <template v-slot:page-content>
      <!-- Item list rendering -->
      <k-board
        v-if="height"
        class="q-pa-md"
        :columns="boardColumns"
        :height="height"
      />
    </template>
    <!-- Enable modal -->
    <router-view service="documents" />
  </KPage>
</template>

<script>
import { utils, mixins } from '@kalisio/kdk/core.client'

export default {
  name: 'kanban-activity',
  components: {
    KBoard: utils.loadComponent('collection/KBoard')
  },
  mixins: [mixins.baseActivity()],
  computed: {
    columnWidth () {
      if (this.$q.screen.lt.md) return 280
      if (this.$q.screen.lt.lg) return 360
      return 440
    },
    boardColumns () {
      return [{
        label: 'Sain',
        value: 'todo',
        props: {
          service: 'documents',
          renderer: { component: 'collection/KCard', class: 'full-width' },
          baseQuery: Object.assign({ etat_sani: 'sain' })
        },
        width: this.columnWidth
      }, {
        label: 'Malade',
        value: 'doing',
        props: {
          service: 'documents',
          renderer: { component: 'collection/KCard', class: 'full-width'  },
          baseQuery: Object.assign({ etat_sani: 'malade' })
        },
        width: this.columnWidth
      }, {
        label: 'Declin',
        value: 'done',
        props: {
          service: 'documents',
          renderer: { component: 'collection/KCard', class: 'full-width'  },
          baseQuery: Object.assign({ etat_sani: 'declin' })
        },
        width: this.columnWidth
      }]
    }
  },
  data () {
    return {
      categories: null,
      categoryField: undefined,
      filter: this.$store.get('filter'),
      cardRenderer: {
        component: 'collection/KCard',
        actions: [
          {
            id: 'view-document',
            icon: 'las la-glasses',
            tooltip: 'KanbanActivity.VIEW_DOCUMENT',
            handler: (context) => this.$router.push({ name: 'view-document', params: { page: 'list', objectId: context.item._id } })
          }
        ]
      },
      height: undefined
    }
  },
  methods: {
    configureActivity () {
      mixins.baseActivity(this.activityName).methods.configureActivity.call(this)
      this.categories = this.activityOptions.categories
      this.categoryField = this.activityOptions.categoryField
    },
    onPageContentResized (size) {
      this.height = size.height - 120
    }
  }
}
</script>
