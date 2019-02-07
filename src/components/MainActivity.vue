<template>
  <div>
    <k-list service="users" :renderer="renderer" :filter-query="searchQuery" />
  </div>
</template>

<script>

import { QBtn } from 'quasar'
import { mixins as kCoreMixins } from '@kalisio/kdk-core/client'

export default {
  name: 'main-activity',
  components: {
    QBtn
  },
  mixins: [
    kCoreMixins.baseActivity
  ],
  inject: [ 'layout' ],
  data () {
    return {
      renderer: {
        component: 'collection/KItem',
        props: {
          itemActions: [{
            label: this.$i18n.t('MainActivity.REMOVE_USER'),
            handler: (user) => this.onRemoveUser(user)
          }]
        }
      }
    }
  },
  methods: {
    refreshActivity () {
      this.clearActivity()
      // Setup the right pane
      this.setRightPanelContent('MainPanel', this.$data)
      // Title
      this.setTitle(this.$t('MainActivity.TITLE'))
      // Search bar
      this.setSearchBar('profile.name')
      // Fab actions
      this.registerFabAction({
        name: 'add_user',
        label: this.$t('MainActivity.ADD_USER'),
        icon: 'person_add',
        handler: this.onAddUser
      })
      this.registerFabAction({
        name: 'open_panel',
        label: this.$t('MainActivity.PANEL'),
        icon: 'keyboard_arrow_right',
        handler: this.onOpenPanel
      })
    },
    onAddUser () {
      this.$router.push({ name: 'register' })
    },
    async onRemoveUser (user) {
      await this.$api.getService('users').remove(user._id)
      if (this.$store.get('user')._id === user._id) this.$router.push({ name: 'logout' })
    },
    onOpenPanel () {
      this.layout.toggleRight()
    }
  },
  created () {
    // Load the required components
    this.$options.components['k-list'] = this.$load('collection/KList')
  },
  mounted () {
    // Initialize required DOM elements, etc.
  },
  beforeDestroy () {
    // Remove event listenres, etc.
  }
}
</script>
