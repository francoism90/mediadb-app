<template>
  <div
    class="absolute-full"
    @mouseenter="activate"
    @mouseover="activate"
    @mouseleave="deactivate"
    @touchstart="activate"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="store.controls"
        class="player-controls absolute-full"
      >
        <playback-control />
        <scrubber-control />
        <settings-control />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl: defineAsyncComponent(() => import('components/player/PlaybackControl.vue')),
    ScrubberControl: defineAsyncComponent(() => import('components/player/ScrubberControl.vue')),
    SettingsControl: defineAsyncComponent(() => import('components/player/SettingsControl.vue')),
  },

  setup() {
    const { store } = usePlayer();
    const timer = ref<number>(0);

    const deactivate = (): void => {
      timer.value = window.setTimeout(() => { store.controls = false; }, 2500);
    };

    const activate = (): void => {
      clearTimeout(timer.value);
      store.controls = true;
      deactivate();
    };

    return {
      activate,
      deactivate,
      store,
    };
  },
});
</script>
