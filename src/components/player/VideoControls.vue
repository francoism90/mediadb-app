<template>
  <div class="player-controls absolute-full">
    <playback-control />
    <!-- <scrubber-control :module="module" /> -->
    <!-- <settings-control :module="module" /> -->
  </div>
</template>

<script lang="ts">
import PlaybackControl from 'src/components/player/PlaybackControl.vue';
// import ScrubberControl from 'src/components/player/ScrubberControl.vue';
// import SettingsControl from 'src/components/player/SettingsControl.vue';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl,
    // ScrubberControl,
    // SettingsControl,
  },
});
</script>
