<template>
  <q-toolbar>
    <q-select
      v-model.lazy="store.params.sort"
      :options="sorters"
      behavior="menu"
      dropdown-icon="expand_more"
      menu-anchor="top left"
      menu-self="top left"
      borderless
      emit-value
      hide-bottom-space
      map-options
      options-dense
      class="select"
      popup-content-class="menu bordered"
    >
      <template #prepend>
        Sort by
      </template>
    </q-select>

    <q-space />
  </q-toolbar>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { defineComponent } from 'vue';

const sorters = [
  { label: 'Default', value: null },
  { label: 'Most Recent', value: 'created:desc' },
  { label: 'Most Viewed', value: 'views:desc' },
  { label: 'Longest', value: 'duration:desc' },
  { label: 'Shortest', value: 'duration:asc' },
];

export default defineComponent({
  name: 'VideoFilters',

  setup() {
    const { store } = useVideos();

    return {
      store,
      sorters,
    };
  },
});
</script>
