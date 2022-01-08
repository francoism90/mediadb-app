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
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/controls/VideoControls.vue')),
  },

  setup() {
    const { container, store, video, initialize, manager, reset } = usePlayer();
    const $q = useQuasar();
    const activeElement = useActiveElement();
    const keys = useMagicKeys();

    const disableKeys = computed(() => activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA');

    onMounted(() => initialize());
    onBeforeUnmount(() => reset());

    watch(() => store.model, () => initialize());
    watch(() => store.request, (value) => manager(value));
    watch(() => $q.fullscreen.isActive, () => manager({ resolution: +new Date() }));
    watch(() => $q.screen.name, () => manager({ resolution: +new Date() }));

    // Key combination
    whenever(and(keys.ctrl_left, disableKeys), () => store.dispatch({ seekBackwards: +new Date() }));
    whenever(and(keys.ctrl_right, disableKeys), () => store.dispatch({ seekForward: +new Date() }));
    whenever(and(keys.ctrl_space, disableKeys), () => store.dispatch({ pause: +new Date() }));

    return {
      container,
      video,
      store,
    };
  },
});
</script>
