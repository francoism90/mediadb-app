<template>
  <div
    ref="container"
    class="player-container relative-position"
  >
    <video
      ref="video"
      autoPictureInPicture
      playsinline
      class="player-video-element absolute fit block no-outline"
      crossorigin="anonymous"
    />

    <video-controls />

    <q-skeleton
      v-if="!store.ready"
      height="100%"
      width="100%"
    />
  </div>
</template>

<script lang="ts">
import { and, useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/controls/VideoControls.vue')),
  },

  setup() {
    const { container, store, video, initialize, manager, reset } = usePlayer();
    const activeElement = useActiveElement();
    const keys = useMagicKeys();

    const disableKeys = computed(() => activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA');

    onMounted(() => initialize());
    onBeforeUnmount(() => reset());

    watch(() => store.model, () => initialize());
    watch(() => store.event, (value) => manager(value));

    // Key combination
    whenever(and(keys.left, disableKeys), () => store.dispatch('FastRewind'));
    whenever(and(keys.right, disableKeys), () => store.dispatch('FastForward'));
    whenever(and(keys.shift_space, disableKeys), () => store.dispatch('TogglePlayback'));
    whenever(and(keys.shift_s, disableKeys), () => store.dispatch('CreateCapture'));

    return {
      container,
      video,
      store,
    };
  },
});
</script>
