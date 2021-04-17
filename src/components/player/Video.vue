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
    const videoContainer = ref<HTMLDivElement | undefined>(undefined)
    const videoElement = ref<HTMLVideoElement | undefined>(undefined)

    const { initPlayer, player } = usePlayer()

    onMounted(() => {
      initPlayer(videoElement.value, props.video.clip || null)
    })

    console.log(videoElement.value)

    watch(videoElement, (value) => {
      console.log(value?.duration)
    })

    const foo = () => { console.log(videoElement.value?.duration) }

    return {
      videoContainer,
      videoElement,
      player,
      foo
    }
  }
})
</script>
