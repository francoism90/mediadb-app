<template>
  <div
    ref="container"
    class="player-video relative-position q-my-md"
  >
    <video
      ref="element"
      autoPictureInPicture
      playsinline
      class="player-video-element absolute fit block no-outline"
      crossorigin="anonymous"
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import { and, useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { useVideo } from 'src/composables/useVideo';
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/VideoControls.vue')),
  },

  setup() {
    const container = ref<HTMLDivElement>();
    const element = ref<HTMLVideoElement>();

    const $q = useQuasar();
    const activeElement = useActiveElement();
    const keys = useMagicKeys();
    const { initialize, destroy, player, state } = usePlayer();
    const { store } = useVideo();

    const disableKeys = computed(() => activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA');

    onMounted(() => initialize(store.data, element.value));
    onBeforeUnmount(() => destroy(player.value));

    // Player Events
    watch(() => state.fullscreen, () => $q.fullscreen.toggle(container.value));

    // Keycombinations
    whenever(and(keys.left, disableKeys), () => player.value?.seek((state.time || 10) - 10));
    whenever(and(keys.right, disableKeys), () => player.value?.seek((state.time || 10) + 10));
    whenever(and(keys.shift_space, disableKeys), () => (state.paused ? player.value?.play() : player.value?.pause()));
    // whenever(and(keys.shift_s, disableKeys), () => manager('CreateCapture'));

    return {
      container,
      element,
    };
  },
});
</script>
