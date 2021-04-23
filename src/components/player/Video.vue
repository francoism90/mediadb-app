<template>
  <div
    ref="videoContainer"
    class="relative-position row no-wrap justify-center items-center player-container"
    @mouseenter="sendRequest({ controls: true })"
    @mousemove="sendRequest({ controls: true })"
    @touchstart="sendRequest({ controls: true })"
  >
    <video
      ref="videoElement"
      autoPictureInPicture
      playsinline
      preload="auto"
      class="col"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :src="video.clip?.stream_url"
      @canplay="setPlayable"
      @cuechange="setMetadata"
      @durationchange="setMetadata"
      @ended="setPlayable"
      @error="setPlayable"
      @fullscreenchange="setPlayable"
      @loadeddata="setMetadata"
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
      @volumechange="setMetadata"
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
        <playback-control :module="module" />
        <scrubber-control :module="module" />
        <settings-control :module="module" />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
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
    module: {
      type: String as PropType<string>,
      required: true
    },

    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const $q = useQuasar()

    const videoContainer = ref<HTMLDivElement | null>(null)
    const videoElement = ref<HTMLVideoElement | null>(null)
    const controlsTimer = ref<number | undefined>(0)
    const isFullscreen = ref<boolean>(false)

    const { createPlayer, setMetadata, setPlayable, sendRequest, request, player } = usePlayer({
      module: props.module,
      model: props.video,
      media: props.video.clip
    })

    const setFullscreen = async (dom: HTMLDivElement | null, value: boolean): Promise<void> => {
      if (value && !isFullscreen.value) {
        await dom?.requestFullscreen()
      } else if (!value && isFullscreen.value) {
        await $q.fullscreen.exit()
      }
    }

    const togglePlay = async (dom: HTMLVideoElement, value: boolean): Promise<void> => {
      if (value === true) {
        dom.pause()
        return
      }

      await dom.play()
    }

    const setCurrentTime = (dom: HTMLVideoElement, value: number): void => {
      dom.currentTime = value
    }

    const setPlaybackRate = (dom: HTMLVideoElement, value: number): void => {
      dom.playbackRate = value
    }

    const toggleControls = (): void => {
      clearTimeout(controlsTimer.value)

      controlsTimer.value = window.setTimeout(() => {
        sendRequest({ controls: false })
      }, 3500)
    }

    onMounted(() => {
      createPlayer(videoElement.value)
    })

    watch(() => $q.fullscreen.isActive, val => {
      isFullscreen.value = val
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
        await setFullscreen(videoContainer.value, value?.fullscreen || false)
      }

      if (value?.controls !== oldValue?.controls) {
        toggleControls()
      }

      if (value?.currentTime !== oldValue?.currentTime) {
        setCurrentTime(videoElement.value, value?.currentTime || 0)
      }

      if (value?.playbackRate !== oldValue?.playbackRate) {
        setPlaybackRate(videoElement.value, value?.playbackRate || 1.0)
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
