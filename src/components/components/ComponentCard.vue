<template>
  <q-card>
    <div class="flex flex-center q-pa-sm full-width text-subtitle1 bg-primary text-white">
      {{ title }}
      <q-space />
      <q-btn round color="primary" icon="las la-code" @click="showingCode = !showingCode" />
    </div>

    <q-card-section>
      <q-slide-transition>
        <pre v-show="code && showingCode" id="code-paragraph">{{ code }}</pre>
      </q-slide-transition>

      <slot />

    </q-card-section>

    <template v-if="props.model">
      <q-separator inset />
      <div class="q-pa-sm full-width row items-baseline q-gutter-x-md">
        <span class="text-caption">Model:</span>
        <span class="text-subtitle2">{{ model }}</span>
      </div>
    </template>

  </q-card>
</template>

<script setup>
import { ref } from 'vue';

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  model: {
    type: String,
    default: null
  },
  code: {
    type: String,
    required: false
  }
})

const showingCode = ref(false)

</script>