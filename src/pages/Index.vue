<template>
  <q-page class="container q-py-xl">
    <q-pull-to-refresh
      :key="id"
    >
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
import { defineComponent, onMounted } from 'vue'
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

    const { getVideos } = useVideos({})
    const { setResponse, id, data, meta } = useRepository('videos')

    onMounted(async () => {
      const response = await getVideos()

      await setResponse(response)
    })

    const onLoad = async () => {
      //
    }

    // console.log('index:', foo.value)
    // console.log('index:', data)
    // console.log('index:', meta)

    // console.log(data.value)
    // console.log(meta.value)

    return {
      id,
      data,
      meta,
      onLoad
    }
  }
})
</script>
