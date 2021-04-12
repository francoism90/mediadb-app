<template>
  <div
    ref="container"
    class="player-container window-width overflow-hidden"
  >
    <Player
      ref="player"
      playsinline
      autoplay
      controls
    >
      <Dash
        :src="video.clip?.stream_url"
        :media-title="video.clip?.name"
        :poster="video.clip?.thumbnail_url"
        :version="dashjs.version"
        cross-origin="use-credentials"
      />

      <DefaultUi>
        <TapSidesToSeek />
      </DefaultUi>
    </Player>
  </div>
</template>

<script lang="ts">
import { Dash, DefaultUi, Player } from '@vime/vue-next'
import dashjs from 'dashjs'
import TapSidesToSeek from 'src/components/player/TapSidesToSeek.vue'
import { Video } from 'src/interfaces/video'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VideoItem',

  components: {
    Player,
    Dash,
    DefaultUi,
    TapSidesToSeek
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup () {
    const player = ref<HTMLDivElement | null>(null)

    return {
      dashjs,
      player
    }
  }
})
</script>
