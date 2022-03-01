<template>
  <q-input
    :model-value="state.filters?.query"
    :debounce="350"
    autofocus
    borderless
    clearable
    clear-icon="close"
    dense
    square
    hide-bottom-space
    placeholder="Search Tags"
    class="input input-text search-input full-width"
    @update:model-value="query"
  >
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useTags } from 'src/composables/useTags';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TagFilters',

  setup() {
    const { state, reset } = useTags();

    const query = (payload: string | number | null) => reset({ query: payload as string });

    return {
      query,
      state,
    };
  },
});
</script>
