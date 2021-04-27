<template>
  <div class="player-tooltip">
    <q-img
      v-if="trackCue.thumbnail"
      :src="trackCue.thumbnail?.url"
      width="160px"
      height="90px"
      class="player-tooltip-thumbnail"
      no-spinner
      no-transition
    />

    <div class="text-white text-center q-py-xs">
      {{ trackCue.time }}
    </div>
  </div>
</template>

<script lang="ts">
import { TextTrackCue } from 'src/interfaces/player'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'PlayerTooltip',

  props: {
    trackCue: {
      type: Object as PropType<TextTrackCue>,
      required: true
    }
  },

  setup () {
    //
  }
})
</script>
