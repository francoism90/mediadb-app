<template>
  <div
    class="absolute-full"
    @mouseenter="start"
    @mouseleave="start"
    @mousemove="start"
    @touchstart.passive="start"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="!ready"
        class="player-video-controls absolute-full all-pointer-events"
      >
        <playback-control />
        <control-bar />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { useTimeout } from '@vueuse/core';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    ControlBar: defineAsyncComponent(() => import('components/player/controls/ControlBar.vue')),
    PlaybackControl: defineAsyncComponent(() => import('components/player/controls/PlaybackControl.vue')),
  },

  setup() {
    const { ready, start, stop } = useTimeout(2000, { controls: true });

    return {
      start,
      stop,
      ready,
    };
  },
});
</script>
