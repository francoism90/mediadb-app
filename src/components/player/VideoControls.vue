<template>
  <div
    class="absolute-full"
    @mouseenter="activate"
    @touchstart="activate"
    @mousemove="activate"
    @mouseleave="deactivate"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-if="controls"
        class="absolute-full player-controls"
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
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl,
    ScrubberControl,
    SettingsControl,
  },

  setup() {
    const controls = ref<boolean>(true);
    const timer = ref<number | undefined>(0);

    const deactivate = (): void => {
      clearTimeout(timer.value);
      timer.value = window.setTimeout(() => { controls.value = false; }, 2000);
    };

    const activate = (): void => {
      controls.value = true;
      deactivate();
    };

    return {
      activate,
      deactivate,
      controls,
    };
  },
});
</script>
