<template>
  <KActivity
    name="document"
    padding
  >
    <div class="row full-width justify-center q-gutter-md">
      <KDocument 
        class="q-pa-sm col-sm-10 col-md-8 col-lg-6 bg-white"
        :url="url"
        :localize="true"
        style="max-height: calc(100vh - 75px);"
      />     
    </div>
  </KActivity>
</template>

<script setup>
import { ref, watch } from 'vue'
import { Layout } from '@kalisio/kdk/core.client'

// Props
const props = defineProps({
  type: {
    type: String,
    required: true
  }
})

// Data
const url = ref(null)

// Watch
watch(() => props.type, (type) => {
  refresh()
}, { immediate: true })

// Function
function refresh () {
  url.value = `sample.${props.type}`
  Layout.setPaneMode('top', props.type)
}
</script>
