<template>
  <KActivity name="messages">
    <KTimeLine
      service="messages"
      class="fit"
      :processor="process"
      :schema="schema"
    />
  </KActivity>
</template>

<script setup>
import _ from 'lodash'
import config from 'config'

// Data
const MessageKinds = config.messagesActivity.messages
console.log(MessageKinds)
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
  _.forEach(messages, message => {
    // process tags
    let decoration = []
    _.forEach(message.tags, tag => {
      decoration.push({ component: 'QChip', label: tag, size: 'sm' })
    })
    message.decoration = decoration
    if (message.kind) message.color = MessageKinds[message.kind].color
  })
  return messages
}
</script>
