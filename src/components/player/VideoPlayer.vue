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
// import { and, useActiveElement, useMagicKeys, whenever } from '@vueuse/core';
import { usePlayer } from 'src/composables/usePlayer';
import { VideoModel } from 'src/interfaces';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, PropType, ref } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/VideoControls.vue')),
  },

  props: {
    model: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const container = ref<HTMLDivElement>();
    const element = ref<HTMLVideoElement>();

    const { initialize, destroy, player } = usePlayer();
    // const activeElement = useActiveElement();
    // const keys = useMagicKeys();

    // const disableKeys = computed(() => activeElement.value?.tagName !== 'INPUT' && activeElement.value?.tagName !== 'TEXTAREA');

    onMounted(() => initialize(props.model, element.value));
    onBeforeUnmount(() => destroy(player.value));

    // watch(() => store.model, () => initialize());

    // Player Events
    // watch(() => store.capture, (value) => manager('CreateCapture', value));
    // watch(() => store.fullscreen, (value) => manager('ToggleFullscreen', value));
    // watch(() => store.playback, (value) => manager('TogglePlayback', value));
    // watch(() => store.seek, (value) => manager('PlayerSeek', value));

    // Key combination
    // whenever(and(keys.left, disableKeys), () => manager('PlayerSeek', store.properties.time - 10));
    // whenever(and(keys.right, disableKeys), () => manager('PlayerSeek', store.properties.time + 10));
    // whenever(and(keys.shift_space, disableKeys), () => manager('TogglePlayback'));
    // whenever(and(keys.shift_s, disableKeys), () => manager('CreateCapture'));

    return {
      container,
      element,
    };
  },
});
</script>
