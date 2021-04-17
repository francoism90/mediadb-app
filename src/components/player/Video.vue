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
          <player-loading />
          <captions />

          <controls
            :active-duration="3500"
            align="start"
            pin="topLeft"
            full-height
            full-width
            hide-on-mouse-leave
            wait-for-playback-start
          >
            <playback-control :video="video" />
          </controls>
        </ui>
      </player>
    </div>
  </div>
</template>

<script lang="ts">
import { Captions, Controls, Dash, Player, Ui } from '@vime/vue-next'
import dashjs from 'dashjs'
import PlaybackControl from 'src/components/player/PlaybackControl.vue'
import PlayerLoading from 'src/components/player/PlayerLoading.vue'
import { Video } from 'src/interfaces/video'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    Controls,
    Captions,
    Dash,
    Player,
    PlayerLoading,
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
