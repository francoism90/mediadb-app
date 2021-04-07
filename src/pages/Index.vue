<template>
  <q-page class="container">
    {{ repositories }}
  </q-page>
</template>

<script lang="ts">
import useVideoRepositories from 'src/composables/useVideoRepositories'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const { repositories } = useVideoRepositories({ page: 1 })

    // console.log(videos)
    console.log(repositories.value)

    return {
      repositories
    }
  }
})
</script>
