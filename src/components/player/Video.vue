<template>
  <div
    ref="container"
    class="player-container window-width overflow-hidden"
  >
    <div class="player-video">
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

        <Ui>
          <TapSidesToSeek />
        </Ui>
      </Player>
    </div>
  </div>
</template>

<script lang="ts">
import { Dash, Player, Ui } from '@vime/vue-next'
import dashjs from 'dashjs'
import TapSidesToSeek from 'src/components/player/TapSidesToSeek.vue'
import { Video } from 'src/interfaces/video'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VideoItem',

  components: {
    Player,
    Dash,
    Ui,
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
