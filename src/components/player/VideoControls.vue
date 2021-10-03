<template>
  <div
    v-if="store.isReady"
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
import PlaybackControl from 'src/components/player/PlaybackControl.vue';
import ScrubberControl from 'src/components/player/ScrubberControl.vue';
import SettingsControl from 'src/components/player/SettingsControl.vue';
import useDash from 'src/composables/useDash';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl,
    ScrubberControl,
    SettingsControl,
  },

  setup() {
    const { store } = useDash();
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
