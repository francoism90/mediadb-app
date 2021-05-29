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
import useRepository from 'src/composables/useRepository';
import useRouter from 'src/composables/useRouter';
import { Tag } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagChips',

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
        params: { 'filter[query]': tag.name },
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
