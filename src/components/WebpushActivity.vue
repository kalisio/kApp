<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <button v-if="isSubscribed" @click="sendNotification">Push</button>
        <button v-if="!isSubscribed" @click="subscribe">Subscribe</button>
        <button v-if="isSubscribed" @click="unsubscribe">Unsubscribe</button>
      </div>
    </template>
  </KPage>
</template>

<script>
import { mixins, api, Store } from '@kalisio/kdk/core.client'
import { 
  checkPrerequisites,
  getPushSubscription,
  subscribePushNotifications,
  unsubscribePushNotifications,
  requestNotificationPermission,
  addSubscription,
  removeSubscription
} from '@kalisio/feathers-webpush/client.js'
import logger from 'loglevel'
import _ from 'lodash'

export default {
  name: 'webpush-activity',
  mixins: [mixins.baseActivity()],
  data () {
    return {
      isSubscribed: false
    }
  },
  methods: {
    async subscribe () {
      // Subscribe to web webpush notifications
      const subscription = await subscribePushNotifications(Store.get('capabilities.api.vapidPublicKey'))
      // Patch user subscriptions
      const user = Store.get('user')
      await addSubscription(user, subscription, 'subscriptions')
       api.service('api/users').patch(Store.user._id, { subscriptions: user.subscriptions })
      this.isSubscribed = true
    },
    async unsubscribe () {
      // Unsubscribe from web webpush notifications
      const subscription = await unsubscribePushNotifications()
      // Patch user subscriptions
      const user = Store.get('user')
      removeSubscription(user, subscription, 'subscriptions')
      api.service('api/users').patch(Store.user._id, { subscriptions: user.subscriptions })
      this.isSubscribed = false
    },
    async sendNotification () {
      // Setup notification params
      const dataNotification = {
        title: 'feathers-webpush example title',
        body: 'feathers-webpush example body',
        icon: 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-icon-256x256.png',
        url: 'https://kalisio.com/'
      }
      // Send webpush notification
      api.service('api/push').create({
        dataNotification: dataNotification, 
        subscriptionService: 'api/users',
        subscriptionProperty: 'subscriptions'
      })
    }
  },
  async mounted () {
    if (checkPrerequisites()) logger.debug('All prerequisites are valid')
    // Check notification permission
    requestNotificationPermission()
    // Check subscription to web push notifications
    const currentSubscription = await getPushSubscription()
    if (currentSubscription) {
      // Check if the subscription is in database
      const user = Store.get('user')
      _.find(_.get(user, 'subscriptions', []), subscription => subscription.endpoint === currentSubscription.endpoint) ? this.isSubscribed = true : this.isSubscribed = false
    } else {
      this.isSubscribed = false
    }
  },
}
</script>
