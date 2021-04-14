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

  setup (props) {
    const { fetchVideos } = useVideos()
    const { setResponse, id, data, meta } = useRepository({ name: 'videos-related', id: props.video.id })

    const onLoad = async (): Promise<void> => {
      const response = await fetchVideos({ append: 'clip' })

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
