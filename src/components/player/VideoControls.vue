<template>
  <div
    class="player-controls absolute-full"
    @mouseenter="activate"
    @touchstart="activate"
    @mousemove="activate"
    @mouseleave="deactivate"
  >
    <template v-if="controls">
      <transition-group
        appear
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut"
      >
        <playback-control key="playback" />
        <scrubber-control key="scrubber" />
        <settings-control key="settings" />
      </transition-group>
    </template>
  </div>
</template>

<script lang="ts">
import PlaybackControl from 'src/components/player/PlaybackControl.vue';
import ScrubberControl from 'src/components/player/ScrubberControl.vue';
import SettingsControl from 'src/components/player/SettingsControl.vue';
import usePlayer from 'src/composables/usePlayer';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackControl,
    ScrubberControl,
    SettingsControl,
  },

  setup() {
    const { store } = usePlayer();

    const controls = ref<boolean>(true);
    const timer = ref<number | undefined>(0);

    const deactivate = (): void => {
      clearTimeout(timer.value);
      timer.value = window.setTimeout(() => { controls.value = false; }, 3500);
    };

    const activate = (): void => {
      controls.value = true;
      deactivate();
    };

    return {
      activate,
      deactivate,
      store,
      controls,
    };
  },
});
</script>
