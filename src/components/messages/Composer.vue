<template>
  <div class="column">
    <div class="row justify-between items-center no-wrap">
      <div class="q-pl-sm">
        <q-fab 
          :icon="getKindIcon(currentKind)"
          :color="getKindColor(currentKind)"
          direction="up"
          :vertical-actions-align="$q.screen.lt.md ? 'left' : 'center'"
          padding="xs"
        >
          <template v-for="kind in availableKinds" :key="kind">
            <q-fab-action 
              :icon="getKindIcon(kind)"
              :color="getKindColor(kind)"
              :label="getKindLabel(kind)"
              padding="xs"
              @click="currentKind = kind"
            />
          </template>
        </q-fab>
      </div>
      <div class="row items-center justify-end">
        <KAction
          id="add-file"
          icon="las la-font"
          tooltip="Composer.FORMAT_MESSAGE"
          :toggle="{ color: 'primary', tooltip: 'Composer.CLOSE_EDITOR' }"
          :handler="() => { editor = !editor }"
          size="0.9rem"
        />
        <KAction
          id="add-file"
          icon="las la-plus-circle"
          tooltip="Composer.ATTACH_FILE"
          :handler="attachFile"
          size="0.9rem"
        />
      </div>
    </div> 
    <div class="row no-wrap">
      <div class="q-pa-sm col">
        <q-editor 
          v-if="editor"
          :placeholder="$t('Composer.WRITE_YOUR_MESSAGE')"
          v-model="body" 
          :toolbar="editorToolbar"
          min-height="4rem"
        />
        <q-input v-else
          :placeholder="$t('Composer.WRITE_YOUR_MESSAGE')"
          v-model="body" 
          hide-bottom-space
          @keydown.enter.prevent="sendMessage"
        />
      </div>
      <KAction
        id="send-message"
        icon="send"
        tooltip="Composer.SEND_MESSAGE"
        :disabled="!hasBody"
        :handler="sendMessage"
      />
    </div>
  </div>
</template>

<script setup>
import _ from 'lodash'
import config from 'config'
import { ref, computed } from 'vue'
import { useQuasar } from 'quasar'
import { i18n, Store, composables as kdkCoreComposables }  from '@kalisio/kdk/core.client'

// Data
const $q = useQuasar()
const User = Store.get('user')
const MessageKinds = config.messagesActivity.messages
const { createMessage } = kdkCoreComposables.useMessages()
const editor = ref(false)
const currentKind = ref(_.head(_.keys(MessageKinds)))
const body = ref('')
const editorToolbar = [
  ['bold', 'italic', 'underline', 'strike', 'unordered', 'ordered'],
  ['quote', 'link', 'hr'],
  [{
    label: $q.lang.editor.align,
    icon: $q.iconSet.editor.align,
    fixedLabel: true,
    list: 'only-icons',
    options: ['left', 'center', 'right', 'justify']
  }],
  ['undo', 'redo']
]
// Computed
const availableKinds = computed(() => {
  return _.difference(_.keys(MessageKinds), [currentKind.value])
})
const hasBody = computed(() => {
  return !_.isEmpty(body.value)
})

// Function
function getKindIcon (kind) {
  return MessageKinds[kind].icon
}
function getKindColor (kind) {
  return MessageKinds[kind].color
}
function getKindLabel (kind) {
  return i18n.t(MessageKinds[kind].label)
}
async function attachFile () {
  $q.notify({ type: 'negative', message: 'Not implemented' })
}
async function sendMessage () {
  if (_.isEmpty(body.value)) return
  let tags = []
  // create the message
  await createMessage({
    kind: currentKind.value,
    body: body.value,
    author: _.get(User, 'profile.name'),
    tags,
  })
  // refresh the interface
  currentKind.value = _.head(_.keys(MessageKinds))
  body.value = ''
}
</script>