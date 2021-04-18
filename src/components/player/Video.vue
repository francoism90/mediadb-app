<template>
  <div
    ref="videoContainer"
    class="relative-position overflow-hidden container player-container"
    @mouseover="controls = true"
    @mouseleave="controls = false"
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

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="controls"
        class="absolute-full player-controls"
      >
        <playback-control module="video-player" />
      </div>
    </transition>
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
    const controls = ref(false)

    const { createPlayer, setMetadata, setPlayable, request, player } = usePlayer({
      module: 'video-player',
      model: props.video,
      media: props.video.clip
    })

    const togglePlay = async (dom: HTMLVideoElement) => {
      if (dom.paused === true) {
        await dom.play()
        return
      }

      dom.pause()
    }

    onMounted(() => {
      createPlayer(videoElement.value)
    })

    watch(request, async (value, oldValue): Promise<void> => {
      // Wait for player and the element to be ready
      if (!player || !videoElement.value) {
        return
      }

      if (value?.pause !== oldValue?.pause) {
        await togglePlay(videoElement.value)
      }

      if (value?.controls !== oldValue?.controls) {
        controls.value = value?.controls || false
      }
    })

    return {
      videoContainer,
      videoElement,
      setMetadata,
      setPlayable,
      player,
      controls
    }
  }
})
</script>
