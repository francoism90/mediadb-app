<template>
  <div class="absolute-bottom q-py-md q-px-lg">
    <seek-control />

    <q-toolbar class="player-video-toolbar">
      <duration-control />
      <q-space />
      <loading-control />
      <settings-control />
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
    SettingsControl: defineAsyncComponent(() => import('src/components/player/controls/SettingsControl.vue')),
  },
});
</script>
