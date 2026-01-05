<template>
  <pre>
    <code :class="className" v-html="highlightedCode" tabindex="0" />
  </pre>
</template>

<script setup>
import hljs from 'highlight.js/lib/core'
import javascript from 'highlight.js/lib/languages/javascript'
import xml from 'highlight.js/lib/languages/xml'
import { computed, ref, watch } from 'vue'
import { escapeHtml } from '../../utils.js'

const props = defineProps({
  code: {
    type: String,
    required: true
  },
  language: {
    type: String,
    default: ''
  },
  autodetect: {
    type: Boolean,
    default: true
  },
  ignoreIllegals: {
    type: Boolean,
    default: true
  }
})

hljs.registerLanguage('javascript', javascript)
hljs.registerLanguage('xml', xml)

const language = ref(props.language)
watch(() => props.language, (newLanguage) => {
  language.value = newLanguage
})

const autodetect = computed(() => props.autodetect && !language.value)
const cannotDetectLanguage = computed(() => !autodetect.value && !hljs.getLanguage(language.value))

const className = computed(() => {
  if (cannotDetectLanguage.value) {
    return 'q-mr-md'
  } else {
    return `hljs ${language.value} q-mr-md`
  }
})

const highlightedCode = computed(() => {
  // No idea what language to use, return raw code
  if (cannotDetectLanguage.value) {
    console.warn(`The language "${language.value}" you specified could not be found.`)
    return escapeHtml(props.code)
  }

  if (autodetect.value) {
    const result = hljs.highlightAuto(props.code)
    // eslint-disable-next-line vue/no-side-effects-in-computed-properties
    language.value = result.language ?? ''
    return result.value
  } else {
    const result = hljs.highlight(props.code, {
      language: language.value,
      ignoreIllegals: props.ignoreIllegals,
    })

    return result.value
  }
})
</script>