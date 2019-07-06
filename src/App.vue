<template>
  <!-- Don't drop "q-app" class -->
  <div id="q-app">
    <!-- TODO 'delay' property has been dropped after v.0.16 - how to replicate? -->
    <q-ajax-bar ref="bar" position="bottom" size="8px" color="primary" :delay="250" :skip-hijack="false"></q-ajax-bar>
    <router-view></router-view>
  </div>
</template>

<script>
import _ from 'lodash'
import { QAjaxBar } from 'quasar'

/*
 * Root component
 */
export default {
  components: {
    QAjaxBar
  },
  methods: {
    showError (message) {
      this.$q.notify({
        type: 'negative',
        message,
        timeout: 5000
      })
    },
    showRouteError (route) {
      // We handle error on any page with query string
      if (route.query) {
        if (route.query.error_message) {
          this.showError(route.query.error_message)
        }
      }
    },
    startProgress () {
      let progressBar = this.$refs.bar
      // TODO QAjaxBar 'active' prop is undefined ...
      if (progressBar && /*!progressBar.active &&*/ (this.nbRequests > this.nbCompletedRequests)) {
        progressBar.start()
      }
    },
    stopProgress () {
      let progressBar = this.$refs.bar
      // TODO QAjaxBar 'active' prop is undefined ...
      if (progressBar && /*progressBar.active &&*/ (this.nbRequests <= this.nbCompletedRequests)) {
        progressBar.stop()
      }
    }
  },
  watch: {
    '$route' (to, from) {
      // Check for error when navigating
      this.showRouteError(to)
    }
  },
  beforeCreate () {
    // Request counter used to display progress bar
    this.nbRequests = 0
    this.nbCompletedRequests = 0
  },
  mounted () {
    // Check for error on refresh
    this.showRouteError(this.$route)
    this.$events.$on('error-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
      // Forward to global error handler
      this.$events.$emit('error', hook.error)
    })
    this.$events.$on('error', error => {
      // Translate the message if a translation key exists
      const translation = _.get(error, 'data.translation')
      if (translation) {
        error.message = this.$t('errors.' + translation.key, translation.params)
        if (translation.keys) {
          translation.keys.forEach(key => {
            error.message += '<br/>' + this.$t('errors.' + key, translation.params)
          })
        }
      } else {
        // Overwrite the message using error code
        if (error.code) {
          error.message = this.$t('errors.' + error.code)
        }
      }
      this.showError(error.message)
    })
    this.$events.$on('before-hook', hook => {
      this.nbRequests++
      this.startProgress()
    })
    this.$events.$on('after-hook', hook => {
      this.nbCompletedRequests++
      this.stopProgress()
    })
  }
}
</script>
