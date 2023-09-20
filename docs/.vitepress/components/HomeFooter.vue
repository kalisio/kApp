<template>
  <div>
    <h3 class="title-footer">Sponsored by</h3> 
    <a href="https://kalisio.com">
      <img class="logo-footer" :src="computedlogo">
    </a>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// Data 
const isDarkMode = ref(false)
const htmlElement = document.querySelector('html')

// computed
const computedlogo = computed(() => {
  if (isDarkMode.value) return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-white-256x84.png'
  return 'https://s3.eu-central-1.amazonaws.com/kalisioscope/kalisio/kalisio-logo-black-256x84.png'
})

// Functions 
function observeHtmlClassChanges (callback) {
  const observer = new MutationObserver ((mutationsList, observer) => {
    for (const mutation of mutationsList) {
      if (mutation.target === htmlElement && mutation.type === 'attributes' && mutation.attributeName === 'class') callback(htmlElement.classList)
    }
  })

  observer.observe(htmlElement, { attributes: true })

  return observer
}

// Hooks
onMounted(() => {
  htmlElement.className === 'dark' ? isDarkMode.value = true : isDarkMode.value = false
})

// Immediate
observeHtmlClassChanges ((classList) => {
  Array.from(classList).join(' ') === 'dark' ? isDarkMode.value = true : isDarkMode.value = false
})
</script>

<style>
  .title-footer {
    text-align: center; 
    margin-top: 50px; 
    font-size: 20px; 
    font-weight: 700
  }
  .logo-footer {
    margin-left: auto; 
    margin-right: auto
  }
</style>