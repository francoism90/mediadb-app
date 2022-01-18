<template>
  <div />
</template>

<script lang="ts">
import { dateFormat, timeFormat } from 'src/helpers';
import { VideoModel } from 'src/interfaces';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideoMetadata',

  components: {
    // TagList: defineAsyncComponent(() => import('components/tags/TagList.vue')),
    // VideoSection: defineAsyncComponent(() => import('components/videos/VideoSection.vue')),
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const tagsByType = (type: string) => props.video.tags?.filter((tag) => tag.type === type);

    const cast = computed(() => tagsByType('actor'));
    const languages = computed(() => tagsByType('language'));
    const genres = computed(() => tagsByType('genre'));
    const studios = computed(() => tagsByType('studio'));

    const duration = computed(() => timeFormat(props.video.duration));
    const created = computed(() => dateFormat(props.video.created_at));
    const released = computed(() => dateFormat(props.video.released_at));

    return {
      cast,
      created,
      duration,
      genres,
      languages,
      released,
      studios,
    };
  },
});
</script>
