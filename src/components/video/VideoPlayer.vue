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
import { and, tryOnBeforeUnmount, tryOnMounted, useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { useVideo } from 'src/composables/useVideo';
import { VideoModel } from 'src/interfaces';
import { computed, defineAsyncComponent, defineComponent, ref, watch } from 'vue';

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

    const { initialize, reset, destroy, player, state } = usePlayer();
    const { save, state: video } = useVideo();

    const disableKeys = computed(() => activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA');

    const capture = async () => {
      const data = <VideoModel>{ thumbnail: state.time || video.data?.thumbnail };
      await save(video.data?.id || '', data);
    };

    tryOnMounted(() => initialize(video.data, element.value), false);
    tryOnBeforeUnmount(() => destroy(player.value));

    // Player events
    watch(() => state.fullscreen, () => $q.fullscreen.toggle(container.value));
    watch(() => video.data?.id, () => reset(video.data), { deep: true });

    // Key combinations
    whenever(and(keys.left, disableKeys), () => player.value?.seek((state.time || 10) - 10));
    whenever(and(keys.right, disableKeys), () => player.value?.seek((state.time || 10) + 10));
    whenever(and(keys.shift_space, disableKeys), () => (state.paused ? player.value?.play() : player.value?.pause()));
    whenever(and(keys.shift_s, disableKeys), () => capture());

    return {
      container,
      element,
    };
  },
});
</script>
