<template>
  <div
    ref="container"
    class="player-container full-width"
  >
    <div class="player-video">
      <player
        ref="player"
        playsinline
        autoplay
        icons="material"
      >
        <dash
          :src="video.clip?.stream_url"
          :media-title="video.clip?.name"
          :poster="video.clip?.thumbnail_url"
          :version="dashjs.version"
          cross-origin="use-credentials"
        />

        <ui>
          <controls
            :active-duration="3500"
            align="start"
            full-width
            full-height
          >
            <playback-control :video="video" />
          </controls>
        </ui>
      </player>
    </div>
  </div>
</template>

<script lang="ts">
import { Controls, Dash, Player, Ui } from '@vime/vue-next'
import dashjs from 'dashjs'
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import { Video } from 'src/interfaces/video'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    Controls,
    Dash,
    Player,
    Ui,
    PlaybackControl
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
