<template>
  <KPage>
    <template v-slot:page-content>
      <div class="window-height justify-center items-center column">
        <KAction
          v-if="!isSubscribed"
          id="subscribe-btn"
          renderer="form-button"
          color="primary"
          label="webpush.SUBCRIBE"
          :handler="subscribe"
        />
        <div v-if="isSubscribed">
          <div class="ellipsis text-h6">{{ $tie('webpush.FORM_TITLE') }}</div>
          <KForm
            ref='form'
            :values='values'
            :schema='schema'
            @field-changed="onFieldChanged"
          />
          <KAction
            id="push-btn"
            renderer="form-button"
            color="primary"
            size="sm"
            label="webpush.PUSH"
            :handler="sendNotification"
          />
          &nbsp;&nbsp;
          <KAction
            id="unsubscribe-btn"
            renderer="form-button"
            color="secondary"
            size="sm"
            label="webpush.UNSUBCRIBE"
            :handler="unsubscribe"
          />
        </div>

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
import baseSchema from '../schemas/push.create.json'

export default {
  name: 'webpush-activity',
  mixins: [mixins.baseActivity()],
  data () {
    return {
      isSubscribed: false,
      schema: baseSchema,
      values: {}
    }
  },
  methods: {
    async subscribe () {
      // Check notification permission
      requestNotificationPermission()
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
      api.service('api/push').create({
        dataNotification: this.values, 
        subscriptionService: 'api/users',
        subscriptionProperty: 'subscriptions'
      })
    },
    async onFieldChanged (field, value) {
      if (field === 'title') this.values.title = value
      else if (field === 'body') this.values.body = value
      else if (field === 'icon') this.values.icon = value
      else if (field === 'url') this.values.url = value
    }
  },
  async mounted () {
    if (checkPrerequisites()) logger.debug('All prerequisites are valid')
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
