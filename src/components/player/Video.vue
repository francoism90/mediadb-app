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

    <video-controls />
  </div>
</template>

<script lang="ts">
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { useQuasar } from 'quasar';
import { PlayerRequest } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, ref, toRefs, watch,
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
      useVideo, destroy, useEvents, destroyEvents, store,
    } = usePlayer();

    const container = ref<HTMLDivElement | null>(null);
    const media = ref<HTMLMediaElement | null>(null);

    const resetMedia = (): void => {
      // @doc https://stackoverflow.com/a/28060352
      media.value?.pause();
      media.value?.removeAttribute('src');
      media.value?.load();
    };

    const loadVideo = async (): Promise<void> => {
      resetMedia();
      useEvents(media.value);

      await useVideo({
        type: 'video',
        media: media.value,
        model: video.value,
        source: video.value.clip?.stream_url || '',
      });
    };

    const unloadVideo = async (): Promise<void> => {
      destroyEvents(media.value);
      resetMedia();

      await destroy();
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

    watch(() => store.$state.request, playerEvent);

    onMounted(loadVideo);
    onBeforeUnmount(unloadVideo);

    return {
      container,
      media,
      store,
    };
  },
});
</script>
