<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    flat
    square
  >
    <router-link :to="{ name: 'video', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.clip?.thumbnail_url"
        placeholder-src="~assets/placeholder/16x16.webp"
        class="video-item-placeholder cursor-pointer"
        img-class="video-item-placeholder"
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

      <chips
        v-if="video.tags.length"
        :tags="video.tags"
      />
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
    const { formatTime } = useFilters()

    const clipDuration = computed(() => formatTime(props.video.clip?.duration || 0))

    return {
      clipDuration
    }
  }
})
</script>
