<template>
  <div class="full-width row justify-between items-center">
    <KStamp text="Header" direction="horizontal" />
    <KAction
      id ="close-header"
      icon="las la-times"
      tooltip="Close"
      color="white"
      :handler="close"
    />
  </div>
</template>

<script setup>
import { Layout } from '@kalisio/kdk/core.client'

// Functions
function close () {
  Layout.setHeaderVisible(false)
}
</script>