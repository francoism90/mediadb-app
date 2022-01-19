<template>
  <div class="filter-item-field">
    <h1>List</h1>
    <p>All</p>
    <p>Bookmarks</p>
    <p>Watchlist</p>
    <p>History</p>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterList',

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
