<template>
  <div />
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, PropType, ref, toRefs,
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
    const { store } = usePlayer({ video });

    const containerDom = ref<HTMLDivElement | null>(null);
    const mediaDom = ref<HTMLMediaElement | null>(null);
  },
});
</script>
