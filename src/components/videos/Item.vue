<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    dark
    flat
    square
  >
    <q-img
      :alt="video.name"
      class="video-item-placeholder cursor-pointer"
      height="160"
      width="100%"
      img-class="video-item-cover"
      src="https://cdn.quasar.dev/img/mountains.jpg"
    />

    <q-card-section class="q-px-none q-py-dm">
      <div class="video-item-title">
        {{ video.name }}
      </div>

      <div class="q-py-sm video-item-description">
        {{ formatTimestamp(video.duration) }}
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Video } from 'src/interfaces/video'
import useFilters from 'src/composables/useFilters'

export default defineComponent({
  name: 'VideoItem',

  // components: {
  // NavigationLink,
  // GlobalSearch
  // },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: false
    }
  },

  setup () {
    const { formatTimestamp } = useFilters()

    return {
      formatTimestamp
    }
  }
})
</script>
