<template>
  <div
    class="absolute-full"
    @mouseenter="activate"
    @mouseleave="deactivate"
    @mousemove="activate"
    @touchstart="activate"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="visible"
        class="player-video-controls absolute-full all-pointer-events"
      >
        <control-bar />
        <model-bar />
        <playback-control />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    ControlBar: defineAsyncComponent(() => import('components/player/controls/ControlBar.vue')),
    ModelBar: defineAsyncComponent(() => import('components/player/controls/ModelBar.vue')),
    PlaybackControl: defineAsyncComponent(() => import('components/player/controls/PlaybackControl.vue')),
  },

  setup() {
    const { store } = usePlayer();
    const timer = ref<number>(0);

    const visible = computed(() => store.activity || store.controls);

    const deactivate = (): void => {
      if (store.activity) return;

      timer.value = window.setTimeout(() => {
        store.controls = false;
      }, 2500);
    };

    const activate = (): void => {
      clearTimeout(timer.value);

      store.controls = true;
      deactivate();
    };

    return {
      activate,
      deactivate,
      visible,
    };
  },
});
</script>
