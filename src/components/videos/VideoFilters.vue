<template>
  <q-toolbar>
    <template v-if="query">
      <q-btn
        :label="query"
        class="btn btn-bordered btn-reset"
        icon-right="close"
        no-caps
        @click="onClick"
      />
    </template>

    <q-space />

    <q-btn
      class="btn btn-bordered"
      label="Filters"
      icon="filter_list"
      @click="visible = !visible"
    />
  </q-toolbar>

  <q-slide-transition>
    <div v-show="visible">
      <nav class="q-pt-lg">
        <div class="filter-form row q-col-gutter-md">
          <filter-list class="col-xs-12 col-md-4" />
          <filter-features class="col-xs-12 col-md-4" />
          <filter-sorter class="col-xs-12 col-md-4" />
        </div>
      </nav>
    </div>
  </q-slide-transition>
</template>

<script lang="ts">
import { useVideos } from 'src/composables/useVideos';
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'VideoFilters',

  components: {
    FilterFeatures: defineAsyncComponent(() => import('src/components/videos/FilterFeatures.vue')),
    FilterList: defineAsyncComponent(() => import('components/videos/FilterList.vue')),
    FilterSorter: defineAsyncComponent(() => import('components/videos/FilterSorter.vue')),
  },

  setup() {
    const visible = ref<boolean>(false);

    const { reset, state } = useVideos();

    const query = computed(() => state.filters?.query?.slice(0, 20));

    const onClick = () => reset({ query: null });

    return {
      onClick,
      state,
      query,
      visible,
    };
  },
});
</script>
