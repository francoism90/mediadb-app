<template>
  <q-card
    :class="[tag.type ? tag.type : '', 'tag-section cursor-pointer q-py-sm q-px-md']"
    draggable="false"
    flat
    square
    @click="onClick"
  >
    <q-card-section horizontal>
      <div class="text-weight-medium ellipsis">
        {{ tag.name }}
      </div>
    </q-card-section>

    <q-card-section horizontal>
      <div class="text-caption text-grey-5 ellipsis">
        {{ tag.items || 0 }} items
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import useRouter from 'src/composables/useRouter';
import useVideos from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagsItem',

  props: {
    tag: {
      type: Object as PropType<TagModel>,
      required: true,
    },
  },

  setup(props) {
    const { store } = useVideos();
    const { router } = useRouter();

    const onClick = async () => {
      store.reset({
        filter: { tags: [props.tag.name] },
      });

      await router.push({ name: 'home' });
    };

    return {
      onClick,
    };
  },
});
</script>
