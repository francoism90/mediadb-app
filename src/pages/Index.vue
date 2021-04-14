<template>
  <q-page
    :key="updatedAt"
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
    const { setResponse, data, meta, isLoadable, nextPage, updatedAt } = useRepository({ store: 'videos' })

    const onLoad = async (): Promise<void> => {
      const pageNumber = nextPage.value as number
      const peformFetch = isLoadable.value as boolean

      if (peformFetch) {
        const response = await fetchVideos({
          append: 'clip',
          'page[number]': pageNumber || 1
        })

        await setResponse(response)
      }
    }

    return {
      data,
      meta,
      updatedAt,
      onLoad
    }
  }
})
</script>
