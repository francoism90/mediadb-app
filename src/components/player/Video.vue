<template>
  <div
    ref="container"
    class="relative-position row no-wrap justify-center items-center player-container"
  >
    <video
      ref="media"
      autoPictureInPicture
      playsinline
      preload="metadata"
      autoplay
      class="col"
      crossorigin="anonymous"
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :poster="video.clip?.thumbnail_url"
      :muted="store.properties.muted"
      :playbackRate="store.properties.playbackRate"
      :volume="store.properties.volume"
    >
      <track
        id="sprite"
        default
        kind="metadata"
        srclang="en"
        :src="video.clip?.sprite_url"
      >
    </video>

    <video-controls v-if="store.ready" />
  </div>
</template>

<script lang="ts">
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { useQuasar } from 'quasar';
import { PlayerRequest } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onBeforeMount, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch,
} from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    VideoControls,
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const { video } = toRefs(props);

    const $q = useQuasar();

    const {
      useVideo, loadVideo, destroy, useEvents, store,
    } = usePlayer();

    const container = ref<HTMLDivElement | null>(null);
    const media = ref<HTMLMediaElement | null>(null);

    const initialize = (): void => {
      useVideo({
        model: video.value,
        source: video.value.clip?.stream_url || '',
      });
    };

    const load = async (): Promise<void> => {
      await destroy(media.value);
      await loadVideo(media.value);

      useEvents(media.value);
    };

    const setCurrentTime = (value: number): void => {
      if (media.value) {
        media.value.currentTime = value;
      }
    };

    const toggleFullscreen = async (): Promise<void> => {
      await $q.fullscreen.toggle(<Element>container.value);
    };

    const togglePlayback = async (): Promise<void> => {
      if (media.value?.paused) {
        await media.value?.play();
        return;
      }

      media.value?.pause();
    };

    const playerEvent = async (event: PlayerRequest | undefined): Promise<void> => {
      if (event && 'fullscreen' in event) await toggleFullscreen();
      if (event && 'playback' in event) await togglePlayback();
      if (event && 'time' in event) setCurrentTime(event.time || 0);
    };

    watch(video, initialize, { deep: true });
    watch(() => store.$state.request, playerEvent);

    onBeforeMount(initialize);
    onBeforeUnmount(() => destroy(media.value));
    onMounted(load);

    return {
      container,
      media,
      store,
    };
  },
});
</script>
