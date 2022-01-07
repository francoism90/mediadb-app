<template>
  <div
    ref="container"
    class="player-container relative-position"
  >
    <div class="player-video-container absolute-full">
      <video
        ref="video"
        autoPictureInPicture
        playsinline
        class="absolute fit block no-outline"
        crossorigin="anonymous"
      />

      <video-controls />
    </div>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/controls/VideoControls.vue')),
  },

  setup() {
    const $q = useQuasar();
    const { container, store, video, initialize, reset, update } = usePlayer();

    onMounted(() => initialize());
    onBeforeUnmount(() => reset());

    watch(() => store.model, () => initialize());
    watch(() => store.request, (value) => update(value));
    watch(() => $q.fullscreen.isActive, () => update({ resolution: +new Date() }));
    watch(() => $q.screen.name, () => update({ resolution: +new Date() }));

    return {
      container,
      video,
    };
  },
});
</script>
