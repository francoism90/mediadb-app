<template>
  <div class="video-details q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-separator dark />

    <q-infinite-scroll
      class="q-py-lg row wrap justify-start items-start content-start q-col-gutter-lg"
      @load="onLoad"
    >
      <q-intersection
        v-for="(item, index) in data"
        :key="index"
        class="col-xs-12 col-sm-6 col-md-4 col-lg-3 col-xl-2"
      >
        <item :video="item" />
      </q-intersection>
    </q-infinite-scroll>
  </div>
</template>

<script lang="ts">
import Item from 'src/components/videos/Item.vue'
import useRepository from 'src/composables/useRepository'
import useVideos from 'src/composables/useVideos'
import { Video } from 'src/interfaces/video'
import { useStore } from 'src/store'
import repositoryModule from 'src/store/repository'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideoDetails',

  components: {
    Item
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup () {
    const store = useStore()

    if (!store.hasModule('videos-related')) {
      store.registerModule('videos-related', repositoryModule)
    }

    const { findVideos } = useVideos()
    const { setResponse, id, data, meta } = useRepository('videos-related')

    const onLoad = async () => {
      const response = await findVideos({ append: 'clip' })

      await setResponse(response)
    }

    return {
      id,
      data,
      meta,
      onLoad
    }
  }
})
</script>
