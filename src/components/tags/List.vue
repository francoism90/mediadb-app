<template>
  <span
    v-for="(tag, index) in tags"
    :key="index"
  >
    <span v-if="index != 0">, </span>
    <a
      class="cursor-pointer text-primary"
      @click="onClick(tag)"
    >{{ tag.name }}</a>
  </span>
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
