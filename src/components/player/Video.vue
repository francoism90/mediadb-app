<template>
  <div
    ref="videoContainer"
    class="relative-position row no-wrap justify-center items-center player-container"
    @mouseenter="activateControls"
    @touchstart="activateControls"
    @mousemove="activateControls"
    @mouseleave="deactivateControls"
  >
    <video
      ref="videoElement"
      autoPictureInPicture
      playsinline
      preload="metadata"
      autoplay
      class="col"
      crossorigin="anonymous"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :src="video.clip?.stream_url"
      :muted="properties.muted"
      :playbackRate="properties.playbackRate"
      :volume="properties.volume"
      @abort="syncProperties"
      @canplay="syncProperties"
      @canplaythrough="syncProperties"
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
    >
      <track
        id="sprite"
        default
        kind="metadata"
        srclang="en"
        :src="video.clip?.sprite_url"
      >
    </video>

    <default-controls
      v-show="properties.controls"
      :module="module"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'
import { useQuasar } from 'quasar'
import { Video } from 'src/interfaces/video'
import DefaultControls from 'src/components/player/DefaultControls.vue'
import usePlayer from 'src/composables/usePlayer'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    DefaultControls
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
    const controlTimer = ref<number | undefined>(0)

    const activateControls = () => {
      setProperties({ controls: true })

      clearTimeout(controlTimer.value)
      controlTimer.value = window.setTimeout(() => {
        setProperties({ controls: false })
      }, 3500)
    }

    const deactivateControls = (): void => {
      setProperties({ controls: false })
    }

    const setCurrentTime = (value: number): void => {
      if (videoElement.value && value !== properties.value?.currentTime) {
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
      deactivateControls,
      syncProperties,
      properties
    }
  }
})
</script>
