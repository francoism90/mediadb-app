<template>
  <router-view :key="user.id || 1" />
</template>

<script lang="ts">
import useSession from 'src/composables/useSession'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'App',

  setup () {
    const { user } = useSession()

    return {
      user
    }
  }
})
</script>
