<template>
  <KActivity
    name="collection"
    :mode="page"
  />
    <div>
      <router-view />
    </div>
</template>

<script setup>
defineProps({
  page: {
    type: String,
    required: true
  }
})
</script>
