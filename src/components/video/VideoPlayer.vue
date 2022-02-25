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
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, ref, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/VideoControls.vue')),
  },

  setup() {
    const container = ref<HTMLDivElement>();
    const element = ref<HTMLVideoElement>();

    const $q = useQuasar();
    const { initialize, destroy, player, state } = usePlayer();
    const { store } = useVideo();

    onMounted(() => initialize(store.data, element.value));
    onBeforeUnmount(() => destroy(player.value));

    watch(() => state.fullscreen, () => $q.fullscreen.toggle(container.value));

    return {
      container,
      element,
    };
  },
});
</script>
