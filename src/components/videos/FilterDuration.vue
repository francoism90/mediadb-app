<template>
  <div class="filter-item-field">
    <h1>Duration</h1>
    <p>Under 4 minutes</p>
    <p>4 - 20 minutes</p>
    <p>Over 20 minutes</p>
  </div>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'FilterDuration',

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
