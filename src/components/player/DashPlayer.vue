<template>
  <div
    ref="container"
    class="player-container relative-position row no-wrap justify-center items-center"
  >
    <video
      ref="video"
      autoPictureInPicture
      playsinline
      class="col"
      crossorigin="anonymous"
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useDash } from 'src/composables/useDash';
import { usePlayer } from 'src/composables/usePlayer';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, watch } from 'vue';

export default defineComponent({
  name: 'DashPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/controls/VideoControls.vue')),
  },

  setup() {
    const $q = useQuasar();
    const { container, video, initialize, reset, update } = useDash();
    const { store, source, token } = usePlayer();

    onMounted(() => initialize(source.value, token.value));
    onBeforeUnmount(() => reset());

    watch(() => $q.fullscreen.isActive, () => update({ resolution: true }));
    watch(() => $q.screen.name, () => update({ resolution: true }));
    watch(() => store.request, (value) => update(value));

    return {
      container,
      video,
    };
  },
});
</script>
