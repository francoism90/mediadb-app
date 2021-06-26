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
    />

    <video-controls />
  </div>
</template>

<script lang="ts">
import VideoControls from 'src/components/player/VideoControls.vue';
import usePlayer from 'src/composables/usePlayer';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onMounted, PropType, ref, toRefs,
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
    const { useVideo, store } = usePlayer();

    const containerDom = ref<HTMLDivElement | null>(null);
    const mediaDom = ref<HTMLMediaElement | null>(null);

    onMounted(async () => {
      await useVideo({
        dom: mediaDom.value,
        model: video.value,
        source: video.value.clip?.stream_url,
      });
    });

    return {
      containerDom,
      mediaDom,
      store,
    };
  },
});
</script>
