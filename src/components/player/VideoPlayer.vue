<template>
  <div
    ref="container"
    class="player-container relative-position"
  >
    <div class="player-video-container absolute-full">
      <video
        ref="element"
        autoPictureInPicture
        playsinline
        class="absolute fit block no-outline"
        crossorigin="anonymous"
        controls
      />

      <!-- <video-controls :state="state" /> -->
    </div>
  </div>

  <video-controls />
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { useSession } from 'src/composables/useSession';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('src/components/player/VideoControls.vue')),
  },

  setup() {
    const { token } = useSession();
    const { store } = useVideo();
    const { container, element, initialize, reset } = usePlayer();

    onMounted(() => initialize(store.data, token.value));
    onBeforeUnmount(() => reset());

    watch(() => store.data, () => initialize(store.data, token.value));

    return {
      container,
      element,
    };
  },
});
</script>
