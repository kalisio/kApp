<template>
  <KActivity
    name="webpush"
    padding
  >
    <div class="fit justify-center items-center column">
      <div>
        <div class="ellipsis text-bold">{{ $tie('webpush.FORM_TITLE') }}</div>
        <KForm
          ref='form'
          :values="values"
          :schema="schema"
          @field-changed="onFieldChanged"
        />
        <KAction
          id="push-btn"
          renderer="form-button"
          color="primary"
          size="md"
          label="webpush.PUSH"
          :handler="sendNotification"
        />
      </div>
    </div>
  </KActivity>
</template>

<script setup>
import config from 'config'
import { ref } from 'vue'
import { api } from '@kalisio/kdk/core.client'
import _ from 'lodash'
import baseSchema from '../../schemas/push.create.json'

// Data
const values = ref({
  title: null,
  body: null,
  icon: null,
  url: null
})
const schema = ref(baseSchema)

// Functions
async function sendNotification () {
  console.log(values.value)
  api.getService('push').create({
    notification: values.value, 
    subscriptionService: `${config.apiPath}/users`,
    subscriptionProperty: 'subscriptions'
  })
}
async function onFieldChanged (field, value) {
  if (field === 'title') values.value.title = value
  else if (field === 'body') values.value.body = value
  else if (field === 'icon') values.value.icon = value
  else if (field === 'url') values.value.url = value
}
</script>
