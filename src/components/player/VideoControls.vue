<template>
  <div
    class="player-controls-container absolute-full"
    @mousemove="activate"
    @mouseenter="activate"
    @mouseleave="deactivate"
    @touchstart="activate"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="controls"
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
import { useQuasar } from 'quasar';
import PlaybackControl from 'src/components/player/PlaybackControl.vue';
import ScrubberControl from 'src/components/player/ScrubberControl.vue';
import SettingsControl from 'src/components/player/SettingsControl.vue';
import usePlayer from 'src/composables/usePlayer';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl,
    ScrubberControl,
    SettingsControl,
  },

  setup() {
    const $q = useQuasar();
    const { store } = usePlayer();

    const controls = ref<boolean>(true);
    const fullscreen = ref<boolean>(false);
    const timer = ref<number | undefined>(0);

    const deactivate = (): void => {
      if (store.properties.paused === true) return;
      clearTimeout(timer.value);
      timer.value = window.setTimeout(() => { controls.value = false; }, 2000);
    };

    const activate = (): void => {
      controls.value = true;

      if (fullscreen.value === true) {
        deactivate();
      }
    };

    watch(() => $q.fullscreen.isActive, (value) => {
      fullscreen.value = value;
      activate();
    });

    return {
      activate,
      deactivate,
      controls,
    };
  },
});
</script>
