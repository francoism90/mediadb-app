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
        <control-bar />
        <model-bar />
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
    ControlBar: defineAsyncComponent(() => import('src/components/player/ControlBar.vue')),
    ModelBar: defineAsyncComponent(() => import('components/player/ModelBar.vue')),
  },

  setup() {
    const { store } = usePlayer();

    const timer = ref<number>(0);

    const deactivate = (): void => {
      // Force controls to be shown
      if (store.activity) return;

      timer.value = window.setTimeout(() => {
        store.controls = false;
      }, 2500);
    };

    const activate = (): void => {
      clearTimeout(timer.value);

      // Show controls and set timeout
      store.controls = true;
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
