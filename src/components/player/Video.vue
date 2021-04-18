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
      @canplay="setPlayable"
      @durationchange="setMetadata"
      @ended="setPlayable"
      @error="setPlayable"
      @loadedmetadata="setMetadata"
      @pause="setPlayable"
      @play="setPlayable"
      @playing="setPlayable"
      @progress="setMetadata"
      @ratechange="setPlayable"
      @seeked="setPlayable"
      @stalled="setPlayable"
      @timeupdate="setPlayable"
      @waiting="setPlayable"
    />

    <div
      class="absolute-full player-controls"
    >
      <playback-control module="video-player" />
    </div>
  </div>
</template>

<script lang="ts">
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import usePlayer from 'src/composables/usePlayer'
import { Video } from 'src/interfaces/video'
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'

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

    const { createPlayer, setMetadata, setPlayable, request, player } = usePlayer({
      module: 'video-player',
      model: props.video,
      media: props.video.clip
    })

    onMounted(() => {
      createPlayer(videoElement.value)
    })

    const togglePlay = async (dom: HTMLVideoElement) => {
      if (dom.paused === true) {
        await dom.play()
        return
      }

      dom.pause()
    }

    watch(request, async (value, oldValue): Promise<void> => {
      // Ignore requests when element isn't ready
      if (!videoElement.value) {
        return
      }

      if (value?.pause !== oldValue?.pause) {
        await togglePlay(videoElement.value)
      }

      if (value?.controls !== oldValue?.controls) {
        console.log('toggleControls')
      }
    })

    return {
      videoContainer,
      videoElement,
      setMetadata,
      setPlayable,
      player
    }
  }
})
</script>
