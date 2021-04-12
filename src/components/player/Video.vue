<template>
  <div
    ref="container"
    class="player-container window-width overflow-hidden"
  >
    <Player
      class="relative-position window-width"
      controls
      :height="video.clip?.height || 480"
      :width="video.clip?.width || 320"
    >
      <Dash
        :src="video.clip?.stream_url"
        :media-title="video.clip?.name"
        :poster="video.clip?.thumbnail_url"
        :version="dashjs.version"
        cross-origin="use-credentials"
      />

      <Ui>
      <!-- UI components are placed here. -->
      </Ui>
    </Player>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { useStore } from 'src/store'
import { Player, Dash, Ui } from '@vime/vue-next'
import { Video } from 'src/interfaces/video'
import dashjs from 'dashjs'
import playerModule from 'src/store/player'
import usePlayer from 'src/composables/usePlayer'

export default defineComponent({
  name: 'VideoItem',

  components: {
    Player,
    Dash,
    Ui
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup () {
    const store = useStore()

    if (!store.hasModule('video-player')) {
      store.registerModule('video-player', playerModule)
    }

    const { id } = usePlayer('video-player')

    return {
      id,
      dashjs
    }
  }
})
</script>
