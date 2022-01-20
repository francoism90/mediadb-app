<template>
  <q-card
    v-close-popup
    class="tag-item transparent"
    draggable="false"
    flat
    square
    @click="query"
  >
    <q-card-section>
      <q-icon
        :name="icon?.name || 'o_tag'"
        class="cursor-pointer"
        size="32px"
      />

      <div class="q-py-xs cursor-pointer text-weight-medium ellipsis-2-lines">
        {{ tag.name }}
      </div>

      <div class="ellipsis">
        {{ tag.items }} items
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
import { router } from 'src/router';
import { computed, defineComponent, PropType } from 'vue';

const icons = [
  { type: 'actor', name: 'o_person' },
  { type: 'language', name: 'o_language' },
  { type: 'studio', name: 'o_theaters' },
];

export default defineComponent({
  name: 'TagItem',

  props: {
    tag: {
      type: Object as PropType<TagModel>,
      required: true,
    },
  },

  setup(props) {
    const { store } = useVideos();

    const icon = computed(() => icons.find((e) => e.type === props.tag.type));

    const query = async () => {
      store.reset({ query: props.tag.name });

      await router.push({ name: 'home' });
    };

    return {
      icon,
      query,
    };
  },
});
</script>
