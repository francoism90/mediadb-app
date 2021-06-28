<template>
  <div class="q-py-xs q-gutter-xs">
    <q-chip
      v-for="(tag, index) in tags"
      :key="index"
      :label="tag.name"
      clickable
      dense
      color="grey-10"
      text-color="grey-5"
      class="text-caption"
      size="0.875em"
      square
      @click="onClick(tag)"
    />
  </div>
</template>

<script lang="ts">
import useRouter from 'src/composables/useRouter';
import useVideos from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagList',

  props: {
    tags: {
      type: Array as PropType<TagModel[]>,
      required: false,
      default: () => (<TagModel[]>[]),
    },
  },

  setup() {
    const { store } = useVideos();
    const { router } = useRouter();

    const onClick = async (tag: TagModel) => {
      store.reset({
        filter: { tags: [tag.slug] },
      });

      await router.push({ name: 'home' });
    };

    return {
      onClick,
    };
  },
});
</script>
