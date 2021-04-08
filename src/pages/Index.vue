<template>
  <q-page class="container">
    {{ data }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent, onMounted } from 'vue'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import useVideos from 'src/composables/useVideos'
import useRepository from 'src/composables/useRepository'

export default defineComponent({
  name: 'IndexPage',

  setup () {
    const store = useStore()

    if (!store.hasModule('videos')) {
      store.registerModule('videos', repositoryModule)
    }

    const { getVideos } = useVideos({})
    const { setResponse, data, meta } = useRepository('videos')

    onMounted(async () => {
      const response = await getVideos()

      await setResponse(response)
    })

    // console.log('index:', foo.value)
    // console.log('index:', data)
    // console.log('index:', meta)

    // console.log(data.value)
    // console.log(meta.value)

    return {
      data,
      meta
    }
  }
})
</script>
