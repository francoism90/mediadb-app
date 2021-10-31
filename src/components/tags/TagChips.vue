<template>
  <div class="q-py-xs q-gutter-xs">
    <q-chip
      v-for="(tag, index) in tags"
      :key="index"
      :label="tag.name"
      class="text-caption"
      clickable
      color="grey-10"
      size="0.95em"
      text-color="grey-5"
      dense
      square
      @click="onClick(tag)"
    />
  </div>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { router } from 'src/router';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagChips',

  props: {
    tags: {
      type: Array as PropType<TagModel[]>,
      default: () => <TagModel[]>[],
    },
  },

  setup() {
    const { store } = useVideos();

    const onClick = async (tag: TagModel) => {
      store.reset({
        filter: { tags: [tag.name] },
      });

      await router.push({ name: 'home' });
    };

    return {
      onClick,
    };
  },
});
</script>
