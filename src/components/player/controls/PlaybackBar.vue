<template>
  <div class="player-navigation absolute-center">
    <playback-control />
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaybackBar',

  components: {
    PlaybackControl: defineAsyncComponent(() => import('components/player/controls/PlaybackControl.vue')),
  },
});
</script>
