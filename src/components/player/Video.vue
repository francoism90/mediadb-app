<template>
  <div
    ref="videoContainer"
    class="relative-position row no-wrap justify-center items-center player-container"
    @mouseenter="activateControls"
    @mousemove="activateControls"
    @touchstart="activateControls"
  >
    <video
      ref="videoElement"
      autoPictureInPicture
      playsinline
      preload="auto"
      autoplay
      class="col"
      crossorigin="anonymous"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :src="video.clip?.stream_url"
      :muted="properties.muted"
      :playbackRate="properties.playbackRate"
      :volume="properties.volume"
      @canplay="syncProperties"
      @cuechange="syncProperties"
      @durationchange="syncProperties"
      @ended="syncProperties"
      @error="syncProperties"
      @loadeddata="syncProperties"
      @loadedmetadata="syncProperties"
      @pause="syncProperties"
      @play="syncProperties"
      @playing="syncProperties"
      @progress="syncProperties"
      @ratechange="syncProperties"
      @seeking="syncProperties"
      @seeked="syncProperties"
      @stalled="syncProperties"
      @timeupdate="syncProperties"
      @waiting="syncProperties"
    />

    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="properties.controls"
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

    const { createPlayer, setProperties, syncProperties, properties } = usePlayer({
      module: props.module,
      model: props.video,
      media: props.video.clip
    })

    const videoContainer = ref<HTMLDivElement | null>(null)
    const videoElement = ref<HTMLMediaElement | null>(null)
    const videoControls = ref<number | undefined>(0)

    const activateControls = () => {
      setProperties({ controls: true })
    }

    const deactiveControls = (): void => {
      clearTimeout(videoControls.value)

      videoControls.value = window.setTimeout(() => {
        setProperties({ controls: false })
      }, 5000)
    }

    const setCurrentTime = (value: number): void => {
      if (videoElement.value) {
        videoElement.value.currentTime = value
      }
    }

    const setFullscreen = async (value: boolean): Promise<void> => {
      if (value === true) {
        await videoContainer.value?.requestFullscreen()
        return
      }

      await $q.fullscreen.exit()
    }

    const setPause = async (value: boolean): Promise<void> => {
      if (value === true) {
        videoElement.value?.pause()
        return
      }

      await videoElement.value?.play()
    }

    onMounted(async () => await createPlayer(videoElement.value))

    watch(properties, async (value, oldValue): Promise<void> => {
      if (value.controls !== oldValue.controls) {
        deactiveControls()
      }

      if (value.requestTime !== oldValue.requestTime) {
        setCurrentTime(value.requestTime)
      }

      if (value.paused !== oldValue.paused) {
        await setPause(value.paused)
      }

      if (value.fullscreen !== oldValue.fullscreen) {
        await setFullscreen(value.fullscreen)
      }
    })

    return {
      videoContainer,
      videoElement,
      activateControls,
      syncProperties,
      properties
    }
  }
})
</script>
