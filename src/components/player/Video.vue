<template>
  <div
    ref="containerDom"
    class="relative-position row no-wrap justify-center items-center player-container"
  >
    <video
      ref="mediaDom"
      autoPictureInPicture
      playsinline
      preload="metadata"
      autoplay
      class="col"
      crossorigin="anonymous"
      controls
      :height="video.clip?.height || 360"
      :width="video.clip?.width || 720"
      :poster="video.clip?.thumbnail_url"
      :muted="store.properties.muted"
      :playbackRate="store.properties.playbackRate"
      :volume="store.properties.volume"
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { PlayerRequest } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, ref, toRefs,
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
    const {
      useVideo, destroy, useEvents, destroyEvents, store,
    } = usePlayer();

    const containerDom = ref<HTMLDivElement | null>(null);
    const mediaDom = ref<HTMLMediaElement | null>(null);

    // @doc https://stackoverflow.com/a/28060352
    const resetMediaDom = (): void => {
      mediaDom.value?.pause();
      mediaDom.value?.removeAttribute('src');
      mediaDom.value?.load();
    };

    const togglePlayback = async (): Promise<void> => {
      if (mediaDom.value?.paused) {
        await mediaDom.value?.play();
        return;
      }

      mediaDom.value?.pause();
    };

    onMounted(async () => {
      useEvents(mediaDom.value);

      await useVideo({
        dom: mediaDom.value,
        model: video.value,
        source: video.value.clip?.stream_url,
      });
    });

    onBeforeUnmount(async () => {
      destroyEvents(mediaDom.value);
      resetMediaDom();

      await destroy();
    });

    store.$onAction(({ name, args, after }) => {
      after(() => {
        if (name === 'dispatch') {
          const request = args[0] as PlayerRequest;

          console.log(request.playback);
        }
      });

    // console.log('do');
    // console.log(args);
    });

    return {
      containerDom,
      mediaDom,
      store,
    };
  },
});
</script>
