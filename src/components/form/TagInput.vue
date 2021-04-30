<template>
  <q-select
    :model-value="tags"
    :input-debounce="300"
    :options="data"
    option-label="name"
    option-value="id"
    @update:model-value="(value) => $emit('update:tags', value)"
    @filter="filterTags"
  >
    <template #option="scope">
      <q-item v-bind="scope.itemProps">
        <q-item-section>
          <q-item-label>
            {{ scope.opt.name }}
          </q-item-label>

          <q-item-label
            caption
            class="text-capitalize"
          >
            {{ scope.opt.type }}
          </q-item-label>
        </q-item-section>
      </q-item>
    </template>
  </q-select>
</template>

<script lang="ts">
import useTags from 'src/composables/useTags';
import { Tag, TagsParameters } from 'src/interfaces/tag';
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'TagInput',

  props: {
    tags: {
      type: [Array, String] as PropType<Tag[] | string>,
      required: false,
      default: () => (<Tag[]>[]),
    },
  },

  emits: ['update:tags'],

  setup() {
    const { filterTags, data } = useTags({
      module: 'tag-input',
      params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 },
    });

    return {
      filterTags,
      data,
    };
  },
});
</script>
