<template>
  <div ref="container" class="player-container window-width overflow-hidden">
    <video
      ref="player"
      crossorigin="use-credentials"
      playsinline
      preload="metadata"
      autoPictureInPicture
      class="relative-position"
      controls
      :height="video.clip?.height || 480"
      :width="video.clip?.width || 320"
    />
  </div>
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
    video: { type: Object as PropType<Video>, required: true }
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
