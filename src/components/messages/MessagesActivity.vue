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
import { i18n, Store } from '@kalisio/kdk/core.client'
import config from 'config'
import _ from 'lodash'

// Data
const baseQuery = { $sort: { createdAt: -1 } }
const filter = Store.get('filter')
const MessageTypes = config.messagesActivity.messages
const renderer = _.merge(
  { component: 'messages/KMessageCard' },
  config.messagesActivity.items
)
const schema = {
  timestampField: 'createdAt',
  authorField: 'author',
  titleField: 'title',
  colorField: 'color',
  decorationField: 'decorations',
  bodyField: 'body'
}

// Function
function process (messages) {
  _.forEach(messages, (message) => {
    const messageType = message.type ?? message.kind
    // process tags
    message.decorations = [
      {
        component: 'KChip',
        name: messageType,
        label: i18n.t(MessageTypes[messageType].label),
        color: MessageTypes[messageType].color,
        textColor: MessageTypes[messageType].textColor,
        icon: MessageTypes[messageType].icon,
        dense: true,
        square: true
      }
    ]
    message.color = MessageTypes[messageType].color
  })
  return messages
}
</script>
