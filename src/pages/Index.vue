<template>
  <q-page class="container">
    {{ repositories }}
  </q-page>
</template>

<script lang="ts">
import useVideos from 'src/composables/useVideos'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const { repositories } = useVideos({ page: 1 })

    // console.log(videos)
    console.log(repositories.value)

    return {
      repositories
    }
  }
})
</script>
