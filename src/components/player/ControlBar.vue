<template>
  <div class="absolute-bottom q-py-md q-px-lg">
    <thumbnail-control />
    <seek-control />

    <q-toolbar class="player-control-bar">
      <playback-control />
      <duration-control />
      <q-space />
      <loading-control />
      <fullscreen-control />
    </q-toolbar>
  </div>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'ControlBar',

  components: {
    DurationControl: defineAsyncComponent(() => import('components/player/DurationControl.vue')),
    FullscreenControl: defineAsyncComponent(() => import('components/player/FullscreenControl.vue')),
    LoadingControl: defineAsyncComponent(() => import('components/player/LoadingControl.vue')),
    PlaybackControl: defineAsyncComponent(() => import('components/player/PlaybackControl.vue')),
    SeekControl: defineAsyncComponent(() => import('components/player/SeekControl.vue')),
    ThumbnailControl: defineAsyncComponent(() => import('components/player/ThumbnailControl.vue')),
  },
});
</script>
