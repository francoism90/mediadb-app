<template>
  <div class="absolute-bottom q-py-md q-px-lg">
    <seek-control />

    <q-toolbar class="player-video-toolbar">
      <duration-control />
      <q-space />
      <quality-control />
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
    QualityControl: defineAsyncComponent(() => import('components/player/controls/QualityControl.vue')),
    SeekControl: defineAsyncComponent(() => import('components/player/controls/SeekControl.vue')),
  },
});
</script>
