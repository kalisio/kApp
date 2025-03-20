<template>
  <KActivity name="messages">
    <KTimeLine
      service="messages"
      :base-query="baseQuery"
      :filter-query="filter.query"
      :nbItemsPerPage="12"
      :processor="process"
      :schema="schema"
      :body-renderer="renderer"
    />
  </KActivity>
</template>

<script setup>
import { Store } from '@kalisio/kdk/core.client'
import config from 'config'
import _ from 'lodash'

// Data
const baseQuery = { $sort: { createdAt: -1 } }
const filter = Store.get('filter')
const MessageKinds = config.messagesActivity.messages
const renderer = _.merge(
  { component: 'messages/KMessageCard' },
  config.messagesActivity.items
)
const schema = {
  timestampField: 'createdAt',
  authorField: 'author',
  titleField: 'title',
  colorField: 'color',
  decorationField: 'decoration',
  bodyField: 'body'
}

// Function
function process (messages) {
  _.forEach(messages, (message) => {
    // process tags
    const decoration = []
    _.forEach(message.tags, (tag) => {
      decoration.push({ component: 'QChip', label: tag, size: 'sm' })
    })
    message.decoration = decoration
    if (message.kind) message.color = MessageKinds[message.kind].color
  })
  return messages
}
</script>
