<template>
  <div class="player-tooltip desktop-only">
    <q-img
      v-if="spriteCue.text"
      :src="spriteCue.text"
      width="160px"
      height="90px"
      class="player-tooltip-thumbnail"
      loading="lazy"
    />

    <div class="text-white text-center q-py-xs">
      {{ spriteCue.time }}
    </div>
  </div>
</template>

<script lang="ts">
import { SpriteTrackCue } from 'src/interfaces/player'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'PlayerTooltip',

  props: {
    spriteCue: {
      type: Object as PropType<SpriteTrackCue>,
      required: true
    }
  },

  setup () {
    //
  }
})
</script>
