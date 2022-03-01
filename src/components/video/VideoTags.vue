<template>
  <div class="container q-py-md q-gutter-xs">
    <q-chip
      v-for="tag in tags"
      :key="tag.id"
      :label="tag.name"
      class="video-item-tag"
      clickable
      square
      @click="onClick(tag)"
    />
  </div>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideoTags',

  props: {
    tags: {
      type: Array as PropType<TagModel[]>,
      default: () => undefined,
    },
  },

  setup() {
    const { reset } = useVideos();

    const onClick = async (tag: TagModel) => reset({ query: tag.name });

    return {
      onClick,
    };
  },
});
</script>
