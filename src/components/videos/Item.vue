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
        height="100%"
        width="100%"
        class="video-item-placeholder cursor-pointer"
        img-class="video-item-cover"
      />
    </router-link>

    <q-card-section class="q-px-none q-py-dm">
      <div class="text-weight-medium video-item-title">
        {{ video.name }}
      </div>

      <div class="q-py-xs text-overline text-grey-5 video-item-description">
        <span>{{ clipDuration }}</span>
        <span class="q-px-sm">•</span>
        <span>{{ video.clip?.resolution }}</span>
      </div>

      <chips :tags="video.tags" />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import Chips from 'src/components/tags/Chips.vue'
import useFilters from 'src/composables/useFilters'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideosItem',

  components: {
    Chips
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const { formatTimestamp } = useFilters()

    const clipDuration = computed(() => formatTimestamp(props.video.clip?.duration || 0))

    return {
      clipDuration
    }
  }
})
</script>
