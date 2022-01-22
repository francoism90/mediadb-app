<template>
  <q-input
    v-model.lazy="store.params.query"
    :debounce="350"
    borderless
    square
    hide-bottom-space
    placeholder="Enter a keyword..."
    class="video-search-field q-px-md full-width"
    input-class="video-search-input"
  >
    <template #append>
      <q-icon
        name="filter_list"
        class="cursor-pointer"
        color="grey-5"
        @click="visible = !visible"
      />
    </template>
  </q-input>

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
      visible,
    };
  },
});
</script>
