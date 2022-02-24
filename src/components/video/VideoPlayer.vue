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
import { usePlayer } from 'src/composables/usePlayer';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/VideoControls.vue')),
  },

  setup() {
    const container = ref<HTMLDivElement>();
    const element = ref<HTMLVideoElement>();

    const { initialize, destroy, player } = usePlayer();
    const { store } = useVideo();

    onMounted(() => initialize(store.data, element.value));
    onBeforeUnmount(() => destroy(player.value));

    return {
      container,
      element,
    };
  },
});
</script>
