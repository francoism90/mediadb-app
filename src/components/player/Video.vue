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
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { PlayerSource } from 'src/interfaces/player';
import { defineComponent, onBeforeUnmount, onMounted, PropType, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls,
  },

  props: {
    source: {
      type: Object as PropType<PlayerSource>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { load, unload, container, video, player, store } = usePlayer();

    const toggleFullscreen = async (): Promise<void> => {
      await $q.fullscreen.toggle(<Element>container.value);
    };

    const togglePlayback = (): void => {
      if (player.value?.isPaused()) {
        return player.value?.play();
      }

      return player.value?.pause();
    };

    watch(() => props.source, () => load(props.source, video.value), { deep: true });
    watch(() => store.fullscreen, toggleFullscreen);
    watch(() => store.pause, togglePlayback);
    watch(() => store.time, (value: number) => player.value?.seek(value));

    onMounted(() => load(props.source, video.value));
    onBeforeUnmount(() => unload());

    return {
      container,
      video,
      store,
    };
  },
});
</script>
