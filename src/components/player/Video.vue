<template>
  <div
    ref="videoContainer"
    class="relative-position overflow-hidden container player-container"
  >
    <video
      ref="videoElement"
      autoPictureInPicture
      controls
      crossorigin="use-credentials"
      playsinline
      preload="auto"
      class="relative-position player-video"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :src="video.clip?.stream_url"
      @durationchange="foo"
    />

    <div
      class="absolute-full player-controls"
    >
      <playback-control
        @click.prevent="getDuration"
      />
    </div>
  </div>
</template>

<script lang="ts">
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import usePlayer from 'src/composables/usePlayer'
import { Video } from 'src/interfaces/video'
import { defineComponent, onMounted, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    PlaybackControl
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const videoContainer = ref<HTMLDivElement | null>(null)
    const videoElement = ref<HTMLVideoElement | null>(null)

    const { createPlayer, player } = usePlayer({
      module: 'video-player',
      model: props.video,
      media: props.video.clip
    })

    onMounted(() => {
      createPlayer(videoElement.value)
    })

    // console.log(videoElement.value)

    return {
      videoContainer,
      videoElement,
      player
    }
  }
})
</script>
