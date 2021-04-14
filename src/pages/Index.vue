<template>
  <q-page
    :key="id"
    class="container q-py-xl"
  >
    <filters />

    <q-pull-to-refresh>
      <q-infinite-scroll
        class="row wrap justify-start items-start content-start q-col-gutter-lg"
        @load="fetchVideos"
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
import Filters from 'src/components/videos/FilterTags.vue'
import Item from 'src/components/videos/Item.vue'
import useVideos from 'src/composables/useVideos'
import { VideosParameters } from 'src/interfaces/video'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'IndexPage',

  components: {
    Item,
    Filters
  },

  setup () {
    const { fetchVideos, id, data, meta } = useVideos({
      repository: {
        module: 'videos',
        params: <VideosParameters>{ append: 'clip', sort: 'created_at', 'page[number]': 1 }
      }
    })

    return {
      fetchVideos,
      id,
      data,
      meta
    }
  }
})
</script>
