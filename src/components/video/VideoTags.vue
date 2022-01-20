<template>
  <div class="q-py-sm q-gutter-xs">
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
import { router } from 'src/router';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideoTags',

  props: {
    tags: {
      type: Array as PropType<TagModel[]>,
      default: () => <TagModel[]>[],
    },
  },

  setup() {
    const { store } = useVideos();

    const onClick = async (tag: TagModel) => {
      store.reset({ query: tag.name });

      await router.push({ name: 'home' });
    };

    return {
      store,
      onClick,
    };
  },
});
</script>
