<template>
  <div style="max-width: 350px">
    <q-expansion-item
      class="text-weight-regular"
      v-model="expanded"
      icon="perm_identity"
      label="Others activities"
    >
      <q-list bordered separator>
        <q-item
          v-for="activity in activities"
          :key="activity.name"
          clickable
          @click="goTo(activity)"
        >
          <q-item-section avatar>
            <q-icon :name="activity.icon"/>
          </q-item-section>

          <q-item-section>
            <q-item-label>{{ $t(activity.label) }}</q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-expansion-item>
  </div>
</template>

<script>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

export default {
  props: {
    activities: {
      type: Array,
      default: () => []
    }
  },

  setup () {
    const router = useRouter()
    const expanded = ref(false)

    function goTo (activity) {
      router.push({
        name: activity.name + '-activity',
        params: activity.params || {}
      })
    }

    return {
      expanded,
      goTo
    }
  }
}
</script>
