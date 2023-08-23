<template>
  <KPage>
    <template v-slot:page-content>
      <div class="window-height full-width justify-center items-center column">
        <div>
          <div class="ellipsis text-bold">{{ $tie('webpush.FORM_TITLE') }}</div>
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
        </div>
      </div>
    </template>
  </KPage>
</template>

<script>
import config from 'config'
import { mixins, api } from '@kalisio/kdk/core.client'
import _ from 'lodash'
import baseSchema from '../schemas/push.create.json'

export default {
  name: 'webpush-activity',
  mixins: [mixins.baseActivity()],
  data () {
    return {
      schema: baseSchema,
      values: {}
    }
  },
  methods: {
    async sendNotification () {
      api.getService('push').create({
        notification: this.values, 
        subscriptionService: `${config.apiPath}/users`,
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
}
</script>
