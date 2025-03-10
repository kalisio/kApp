<template>
  <q-card class="column">
    <q-item class="row col-auto flex flex-center q-pa-sm full-width text-subtitle1 bg-primary text-white">
      {{ title }}
      <q-space />
      <q-btn v-if="code" round color="primary" icon="las la-code" @click="showingCode = !showingCode" />
      <q-icon v-else size="42px" />
    </q-item>

    <q-card-section class="column col">

      <div v-if="code" v-show="showingCode" class="col-auto">
        <KScrollArea :maxHeight="300" class="q-pb-md q-pr-md">
          <CodeHighlight :code="code" language="xml" />
        </KScrollArea>
        <q-separator />
      </div>

      <div class="col flex column flex-center">
        <slot />
      </div>

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
import { KScrollArea } from '@kalisio/kdk/core/client/components';
import { ref } from 'vue';

// highlightjs theme
import "../../css/atom-one-dark.css";
import CodeHighlight from './CodeHighlight.vue';

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