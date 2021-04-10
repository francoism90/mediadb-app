<template>
  <q-page :key="id" class="container q-py-xl">
    <q-pull-to-refresh>
      <q-infinite-scroll
        class="row wrap justify-start items-start content-start q-col-gutter-lg"
        @load="onLoad"
      >
        <q-intersection
          v-for="(item, index) in data"
          :key="index"
          class="col-xs-6 col-sm-4 col-md-3 col-lg-3 col-xl-2"
        >
          <item :video="item" />
        </q-intersection>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useStore } from 'src/store'
import Item from 'src/components/videos/Item.vue'
import repositoryModule from 'src/store/repository'
import useRepository from 'src/composables/useRepository'
import useVideos from 'src/composables/useVideos'

export default defineComponent({
  name: 'IndexPage',

  components: {
    Item
  },

  setup () {
    const store = useStore()

    if (!store.hasModule('videos')) {
      store.registerModule('videos', repositoryModule)
    }

    const { getVideos } = useVideos({ append: 'clip' })
    const { setResponse, id, data, meta } = useRepository('videos')

    const onLoad = async () => {
      const response = await getVideos()

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
