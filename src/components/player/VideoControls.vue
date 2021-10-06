<template>
  <div
    class="absolute-full"
    @mouseenter="activate"
    @mousemove="activate"
    @mouseleave="deactivate"
    @touchstart="activate"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="visible"
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
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';

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

    const reset = (): void => clearTimeout(timer.value);

    const deactivate = (): void => {
      // Force controls to be shown
      if (store.activity) return;

      timer.value = window.setTimeout(() => {
        store.hideControls();
      }, 1000);
    };

    const activate = (): void => {
      // Reset timer
      reset();

      // Show controls and set timeout
      store.showControls();
      deactivate();
    };

    const visible = computed(() => store.activity || store.controls);

    return {
      activate,
      deactivate,
      visible,
    };
  },
});
</script>
