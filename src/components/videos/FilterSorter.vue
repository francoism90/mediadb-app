<template>
  <div class="filter-item-field">
    <h1>Sort by</h1>
    <p>Relevance</p>
    <p>Upload date</p>
    <p>View count</p>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterSorter',

  setup() {
    const { store } = useVideos();

    const visible = ref<boolean>(true);

    useMeta(() => ({ title: 'Videos' }));

    return {
      store,
      visible,
    };
  },
});
</script>
