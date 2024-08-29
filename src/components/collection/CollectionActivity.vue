<template>
  <KActivity
    name="collection"
    :mode="page"
  />
    <div>
      <router-view service="documents" />
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
