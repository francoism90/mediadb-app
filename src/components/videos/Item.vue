<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    dark
    flat
    square
  >
    <router-link :to="{ name: 'video', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.clip?.thumbnail_url"
        class="video-item-placeholder cursor-pointer"
        height="160"
        width="100%"
        img-class="video-item-cover"
      />
    </router-link>

    <q-card-section class="q-px-none q-py-dm">
      <div class="video-item-title">
        {{ video.name }}
      </div>

      <div class="q-py-xs text-overline text-grey-5 video-item-description">
        <span>{{ timestamp }}</span>
        <span class="q-px-sm">•</span>
        <span>{{ video.clip?.resolution }}</span>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { defineComponent, PropType, computed } from 'vue'
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
      required: true
    }
  },

  setup (props) {
    const { formatTimestamp } = useFilters()

    const timestamp = computed(() => formatTimestamp(props.video.clip?.duration || 0))

    return {
      timestamp
    }
  }
})
</script>
