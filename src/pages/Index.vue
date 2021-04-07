<template>
  <q-page class="container">
    <div
      v-for="(model, index) in models"
      :key="index"
    >
      {{ model.name }}
    </div>
  </q-page>
</template>

<script lang="ts">
import useVideos from 'src/composables/useVideos'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const { models, meta } = useVideos({})

    console.log(models.value)
    console.log(meta.value)

    return {
      models
    }
  }
})
</script>
