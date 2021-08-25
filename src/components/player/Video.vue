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
      autoplay
      class="col"
      crossorigin="anonymous"
      :height="store.media?.height || 360"
      :width="store.media?.width || 720"
      :poster="store.media?.thumbnail_url"
      :muted="store.properties?.muted || false"
      :playbackRate="store.properties?.playbackRate || 1.0"
      :volume="store.properties?.volume || 1"
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { useQuasar } from 'quasar';
import { PlayerRequest } from 'src/interfaces/player';
import {
  defineComponent, onMounted, onBeforeUnmount, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls,
  },

  setup() {
    const $q = useQuasar();
    const { load, destroy, store } = usePlayer();

    const container = ref<HTMLDivElement>();
    const video = ref<HTMLMediaElement>();

    const setCurrentTime = (value: number): void => {
      if (video.value) {
        video.value.currentTime = value;
      }
    };

    const toggleFullscreen = async (): Promise<void> => {
      await $q.fullscreen.toggle(<Element>container.value);
    };

    const togglePlayback = async (): Promise<void> => {
      if (video.value?.paused) {
        await video.value?.play();
        return;
      }

      video.value?.pause();
    };

    const playerEvent = async (event: PlayerRequest | undefined): Promise<void> => {
      if (event && 'fullscreen' in event) await toggleFullscreen();
      if (event && 'playback' in event) await togglePlayback();
      if (event && 'time' in event) setCurrentTime(event.time || 0);
    };

    watch(store.request, playerEvent, { deep: true });
    watch(store.source, () => load(video.value), { deep: true });
    onMounted(() => load(video.value));
    onBeforeUnmount(() => destroy(video.value));

    return {
      container,
      video,
      store,
    };
  },
});
</script>
