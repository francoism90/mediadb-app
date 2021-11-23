<template>
  <div class="absolute-bottom q-py-md q-px-lg">
    <tooltip-control />
    <seek-control />

    <q-toolbar class="player-video-toolbar">
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
    DurationControl: defineAsyncComponent(() => import('components/player/controls/DurationControl.vue')),
    FullscreenControl: defineAsyncComponent(() => import('components/player/controls/FullscreenControl.vue')),
    LoadingControl: defineAsyncComponent(() => import('components/player/controls/LoadingControl.vue')),
    SeekControl: defineAsyncComponent(() => import('components/player/controls/SeekControl.vue')),
    TooltipControl: defineAsyncComponent(() => import('components/player/controls/TooltipControl.vue')),
  },
});
</script>
