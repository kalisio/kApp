<template>
  <KPage>
    <template v-slot:page-content>
      <div class="row full-width justify-center q-gutter-md">
        <KTree :nodes="store" />
      </div>
    </template>
  </KPage>
</template>

<script setup>
import _ from 'lodash'
import { ref } from 'vue'
import { Store } from '@kalisio/kdk/core/client'

function convertStore(obj) {
  function traverse(node) {
    return _.keys(node).map(key => {
      const child = node[key]
      if (!_.isFunction(child)) {
        return {
          label: key,
          children: child && _.isObject(child) ? traverse(child) : [{ label: child, children: [] }]
        }
      }
      return false
    })
  }
  return traverse(obj)
}

const store = ref(convertStore(Store))

</script>