<template>
  <div class="full-width row justify-between items-center">
    <KStamp text="Footer" direction="horizontal" />
    <KAction
      id ="close-headers"
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
  Layout.setFooterVisible(false)
}
</script>