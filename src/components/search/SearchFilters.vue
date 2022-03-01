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
    placeholder="Search Videos"
    class="input input-text search-input full-width"
    @update:model-value="query"
  >
    <template #prepend>
      <q-icon name="search" />
    </template>
  </q-input>
</template>

<script lang="ts">
import { useSearch } from 'src/composables/useSearch';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchFilters',

  setup() {
    const { state, reset } = useSearch();

    const query = (payload: string | number | null) => reset({ query: payload as string });

    return {
      query,
      state,
    };
  },
});
</script>
