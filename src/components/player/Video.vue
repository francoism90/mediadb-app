<template>
  <div
    ref="videoContainer"
    class="relative-position row no-wrap justify-center items-center player-container"
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
      :autoplay="properties.autoplay"
      :currentTime="properties.currentTime"
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
      @waiting="syncProperties"
    />

    <playback-control :module="module" />
    <scrubber-control :module="module" />
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import ScrubberControl from 'src/components/player/ScrubberControl.vue'
// import SettingsControl from 'src/components/player/SettingsControl.vue'
import usePlayer from 'src/composables/usePlayer'
import { Video } from 'src/interfaces/video'
import { defineComponent, onMounted, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    PlaybackControl,
    ScrubberControl
    // SettingsControl
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

    const { createPlayer, syncProperties, properties } = usePlayer({
      module: props.module,
      model: props.video,
      media: props.video.clip
    })

    const videoContainer = ref<HTMLDivElement | null>(null)
    const videoElement = ref<HTMLVideoElement | null>(null)

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

    onMounted(() => {
      createPlayer(videoElement.value)
    })

    watch(properties, async (value, oldValue): Promise<void> => {
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
      syncProperties,
      properties
    }
  }
})
</script>
