<template>
  <span
    v-for="(tag, index) in tags"
    :key="index"
  >
    <span v-if="index != 0">, </span>
    <a
      class="cursor-pointer text-primary"
    >{{ tag.name }}</a>
  </span>
</template>

<script lang="ts">
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
    // const { router } = useRouter();

    return {
      // onClick,
    };
  },
});
</script>
