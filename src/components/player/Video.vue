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
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, onMounted, PropType, ref, toRefs,
} from 'vue';

export default defineComponent({
  name: 'VideoPlayer',

  components: {
    // ControlContainer,
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const { video } = toRefs(props);
    const { useVideo, store } = usePlayer({ video });

    const containerDom = ref<HTMLDivElement | null>(null);
    const mediaDom = ref<HTMLMediaElement | null>(null);

    onMounted(async () => {
      await useVideo(mediaDom.value);
    });

    return {
      containerDom,
      mediaDom,
      store,
    };
  },
});
</script>
