<template>
  <q-card
    class="tag-item"
    draggable="false"
    flat
    square
  >
    <q-card-section
      class="poster q-pa-none"
      @click="query"
    >
      <q-icon
        :name="icon?.name || 'o_tag'"
        class="poster-image cursor-pointer"
        color="grey-5"
        size="32px"
      />
    </q-card-section>

    <q-card-section class="q-px-none">
      <div class="q-pb-xs text-weight-medium ellipsis-2-lines">
        {{ tag.name }}
      </div>

      <div class="text-grey-5 text-weight-medium ellipsis">
        {{ tag.items }} items
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import useRouter from 'src/composables/useRouter';
import useVideos from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { computed, defineComponent, PropType } from 'vue';

const icons = [
  {
    type: 'actor',
    name: 'o_person',
  },
  {
    type: 'language',
    name: 'o_language',
  },
  {
    type: 'studio',
    name: 'o_theaters',
  },
];

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

    const query = async () => {
      store.reset({
        filter: { tags: [props.tag.name] },
      });

      await router.push({ name: 'home' });
    };

    const icon = computed(() => icons.find((e) => e.type === props.tag.type));

    return {
      query,
      icon,
    };
  },
});
</script>
