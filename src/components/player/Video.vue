<template>
  <div
    ref="container"
    class="player-container relative-position row no-wrap justify-center items-center"
  >
    <video
      ref="video"
      autoPictureInPicture
      playsinline
      preload="metadata"
      class="col"
      crossorigin="anonymous"
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import VideoControls from 'src/components/player/VideoControls.vue';
import useDash from 'src/composables/useDash';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, watch,
} from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls,
  },

  props: {
    model: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { load, destroy, container, video, player, store } = useDash();

    const toggleFullscreen = async (): Promise<void> => {
      await $q.fullscreen.toggle(<Element>container.value);
    };

    const togglePlayback = (): void => {
      if (player.value?.isPaused()) {
        return player.value.play();
      }

      return player.value?.pause();
    };

    watch(() => props.model, () => load(props.model), { deep: true });
    watch(() => store.fullscreen, toggleFullscreen);
    watch(() => store.pause, togglePlayback);
    watch(() => store.time, (value: number) => player.value?.seek(value));

    onMounted(() => load(props.model));
    onBeforeUnmount(() => destroy);

    return {
      container,
      video,
      store,
    };
  },
});
</script>
