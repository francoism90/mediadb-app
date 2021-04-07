<template>
  <q-page class="container">
    {{ models }}
  </q-page>
</template>

<script lang="ts">
import useVideos from 'src/composables/useVideos'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const { models, meta } = useVideos({ page: 1 })

    console.log(models.value)
    console.log(meta.value)

    return {
      models
    }
  }
})
</script>
