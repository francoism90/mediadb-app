<template>
  <q-toolbar>
    <q-space />

    <q-btn
      class="btn-primary btn-bordered"
      label="Filters"
      icon="filter_list"
      @click="visible = !visible"
    />
  </q-toolbar>

  <q-slide-transition>
    <div v-show="visible">
      <nav class="q-pt-lg">
        <div class="filter-form row q-col-gutter-md">
          <filter-list class="col-xs-12 col-sm-12 col-md-4" />
          <filter-duration class="col-xs-12 col-sm-12 col-md-4" />
          <filter-sorter class="col-xs-12 col-sm-12 col-md-4" />
        </div>
      </nav>
    </div>
  </q-slide-transition>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { defineAsyncComponent, defineComponent, ref } from 'vue';

const sorters = [
  { label: 'Default', value: null },
  { label: 'Most Recent', value: 'created:desc' },
  { label: 'Most Viewed', value: 'views:desc' },
  { label: 'Longest', value: 'duration:desc' },
  { label: 'Shortest', value: 'duration:asc' },
];

export default defineComponent({
  name: 'VideoFilters',

  components: {
    FilterDuration: defineAsyncComponent(() => import('components/videos/FilterDuration.vue')),
    FilterList: defineAsyncComponent(() => import('components/videos/FilterList.vue')),
    FilterSorter: defineAsyncComponent(() => import('components/videos/FilterSorter.vue')),
  },

  setup() {
    const { store } = useVideos();

    const visible = ref<boolean>(false);

    return {
      store,
      sorters,
      visible,
    };
  },
});
</script>
