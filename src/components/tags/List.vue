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
import useRepository from 'src/composables/useRepository';
import useRouter from 'src/composables/useRouter';
import { Tag } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagList',

  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: false,
      default: () => (<Tag[]>[]),
    },
  },

  setup() {
    const { router } = useRouter();
    const { setParams: setModuleParams } = useRepository({ module: 'videos' });

    const onClick = async (tag: Tag) => {
      await setModuleParams({
        params: { filter: { query: tag.name }, 'page[number]': 1 },
        reset: true,
      });

      await router.push({ name: 'home' });
    };

    return {
      onClick,
    };
  },
});
</script>
