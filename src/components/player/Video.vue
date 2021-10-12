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

    <video-controls v-if="store.isReady" />
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import usePlayer from 'src/composables/usePlayer';
import { PlayerProperties, PlayerSource } from 'src/interfaces/player';
import { defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted, PropType, watch } from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls: defineAsyncComponent(() => import('components/player/VideoControls.vue')),
  },

  props: {
    source: {
      type: Object as PropType<PlayerSource>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { load, unload, update, container, video, player, store } = usePlayer();

    const toggleFullscreen = async (): Promise<void> => {
      await $q.fullscreen.toggle(<Element>container.value);
    };

    const togglePlayback = (): void => {
      if (player.value?.isPaused()) {
        return player.value?.play();
      }

      return player.value?.pause();
    };

    const onScreenChange = () => update(player.value, <PlayerProperties>{
      fullscreen: $q.fullscreen.isActive,
    });

    onMounted(() => load(props.source, video.value));
    onBeforeUnmount(() => unload());

    watch(() => props.source, () => load(props.source, video.value), { deep: true });
    watch(() => $q.fullscreen.isActive, (): void => onScreenChange());
    watch(() => $q.screen.name, (): void => onScreenChange());

    // Requests
    watch(() => store.fullscreen, toggleFullscreen);
    watch(() => store.pause, togglePlayback);
    watch(() => store.time, (value: number) => player.value?.seek(value));

    return {
      container,
      video,
      store,
    };
  },
});
</script>
