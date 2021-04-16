<template>
  <div class="video-related q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-separator dark />

    <q-pull-to-refresh :key="id">
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
    </q-pull-to-refresh>
  </div>
</template>

<script lang="ts">
import Item from 'src/components/videos/Item.vue'
import useVideos from 'src/composables/useVideos'
import { Video, VideosParameters } from 'src/interfaces/video'
import { defineComponent, PropType, toRefs } from 'vue'

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
    const { video } = toRefs(props)

    const { fetchVideos, isLoadable, id, data, meta } = useVideos({
      module: 'video-related',
      params: <VideosParameters>{
        sort: 'recommended',
        'filter[related]': video.value.id,
        'page[number]': 1,
        'page[size]': 5
      }
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetchVideos()
        await done(!isLoadable.value)
      } catch {
        //
      } finally {
        //
      }
    }

    return {
      onLoad,
      id,
      data,
      meta
    }
  }
})
</script>
