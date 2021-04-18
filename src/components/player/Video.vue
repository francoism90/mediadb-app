<template>
  <div
    ref="videoContainer"
    class="relative-position overflow-hidden container player-container"
    @mouseover="sendRequest({ controls: true })"
    @mouseleave="sendRequest({ controls: false })"
  >
    <video
      ref="videoElement"
      autoPictureInPicture
      crossorigin="use-credentials"
      playsinline
      preload="auto"
      class="relative-position full-height full-width player-video"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :src="video.clip?.stream_url"
      @canplay="setPlayable"
      @durationchange="setMetadata"
      @ended="setPlayable"
      @error="setPlayable"
      @fullscreenchange="setPlayable"
      @loadedmetadata="setMetadata"
      @pause="setPlayable"
      @play="setPlayable"
      @playing="setPlayable"
      @progress="setMetadata"
      @ratechange="setPlayable"
      @seeking="setPlayable"
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
        v-show="request.controls"
        class="absolute-full player-controls"
      >
        <playback-control module="video-player" />
        <settings-control module="video-player" />
        <scrubber-control module="video-player" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import ScrubberControl from 'src/components/player/ScrubberControl.vue'
import SettingsControl from 'src/components/player/SettingsControl.vue'
import usePlayer from 'src/composables/usePlayer'
import { Video } from 'src/interfaces/video'
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    PlaybackControl,
    ScrubberControl,
    SettingsControl
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

    const { createPlayer, setMetadata, setPlayable, sendRequest, request, player, stream } = usePlayer({
      module: 'video-player',
      model: props.video,
      media: props.video.clip
    })

    const togglePlay = async (dom: HTMLVideoElement, value: boolean): Promise<void> => {
      if (value === true) {
        dom.pause()
        return
      }

      await dom.play()
    }

    const setCurrentTime = (dom: HTMLVideoElement, value: number): void => {
      // TODO: check duration?
      dom.currentTime = value
    }

    const toggleFullscreen = async (dom: HTMLDivElement | null): Promise<void> => {
      const isActive = stream.value?.fullscreen || false

      if (dom && isActive) {
        await document.exitFullscreen()
      } else if (dom && !isActive) {
        await dom.requestFullscreen()
      }
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
        await togglePlay(videoElement.value, value?.pause || false)
      }

      if (value?.fullscreen !== oldValue?.fullscreen) {
        await toggleFullscreen(videoContainer.value)
      }

      if (value?.currentTime !== oldValue?.currentTime) {
        setCurrentTime(videoElement.value, value?.currentTime || 0)
      }
    })

    return {
      videoContainer,
      videoElement,
      sendRequest,
      setMetadata,
      setPlayable,
      player,
      request
    }
  }
})
</script>
