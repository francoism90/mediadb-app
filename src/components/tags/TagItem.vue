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
        size="24px"
      />

      <div class="q-py-xs text-weight-medium ellipsis-2-lines cursor-pointer">
        {{ tag.name }}
      </div>

      <div class="tag-item-meta ellipsis">
        {{ tag.items }} items
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { TagModel } from 'src/interfaces/tag';
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
    const { reset } = useVideos();

    const icon = computed(() => icons.find((e) => e.type === props.tag.type));

    const query = () => reset({ query: props.tag.name });

    return {
      icon,
      query,
    };
  },
});
</script>
