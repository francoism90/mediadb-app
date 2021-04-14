<template>
  <q-page
    :key="id"
    class="container q-py-xl"
  >
    <filters store="videos" />

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
import Filters from 'src/components/videos/Filters.vue'
import Item from 'src/components/videos/Item.vue'
import useRepository from 'src/composables/useRepository'
import useVideos from 'src/composables/useVideos'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    Item,
    Filters
  },

  setup () {
    const { fetchVideos } = useVideos()
    const { setResponse, isLoadable, id, data, meta } = useRepository('videos')

    const onLoad = async () => {
      const nextPage = isLoadable.value as boolean

      // TODO: add const loading
      if (nextPage) {
        const response = await fetchVideos({ append: 'clip' })

        await setResponse(response)
      }
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
