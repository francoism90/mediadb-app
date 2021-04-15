<template>
  <q-page class="container q-py-xl">
    <q-toolbar />

    <span class="text-white">{{ id }}</span>

    <q-pull-to-refresh>
      <q-infinite-scroll
        class="row wrap justify-start items-start content-start q-col-gutter-lg"
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
  </q-page>
</template>

<script lang="ts">
import Item from 'src/components/videos/Item.vue'
import useVideos from 'src/composables/useVideos'
import { VideosParameters } from 'src/interfaces/video'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    Item
  },

  setup () {
    const { fetchVideos, id, data, meta } = useVideos({
      module: 'videos',
      params: <VideosParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 }
    })

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      await fetchVideos()
      await done()
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
