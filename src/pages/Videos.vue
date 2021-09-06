<template>
  <q-page class="container">
    <q-toolbar class="bg-dark q-py-lg">
      <q-select
        v-model.lazy="store.query.sort"
        :options="sorters"
        behavior="menu"
        class="text-body2 text-weight-medium q-px-none"
        dropdown-icon="expand_more"
        borderless
        emit-value
        dense
        hide-bottom-space
        map-options
        options-dense
        popup-content-class="menu bordered"
        popup-content-style="width: 200px; max-width: 100vw;"
      >
        <template #prepend>
          <span class="text-body2 mobile-hide">Sort by</span>
        </template>
      </q-select>

      <q-space />

      <q-btn
        icon="filter_list"
        color="grey-5"
        outline
        label="Filters"
        @click="showFilters"
      >
        <q-badge
          v-if="filters.length > 0"
          :label="filters.length"
          floating
        />
      </q-btn>
    </q-toolbar>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="store.id"
        :debounce="300"
        @load="onLoad"
      >
        <div class="row wrap justify-start items-start content-start q-col-gutter-sm">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 video-item"
          >
            <item :video="item" />
          </q-intersection>
        </div>

        <template #loading>
          <div class="row no-wrap justify-center q-py-lg">
            <q-spinner-oval
              color="primary"
              size="2em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { filter } from 'lodash';
import { useMeta, useQuasar } from 'quasar';
import Filters from 'src/components/videos/Filters.vue';
import Item from 'src/components/videos/Item.vue';
import useVideos from 'src/composables/useVideos';
import { authenticate } from 'src/services/auth';
import { computed, defineComponent, watch } from 'vue';

const sorters = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Recent', value: '-created_at' },
  { label: 'Most Views', value: '-views' },
  { label: 'Longest', value: '-duration' },
  { label: 'Shortest', value: 'duration' },
];

export default defineComponent({
  name: 'Videos',

  components: {
    Item,
  },

  async preFetch({ redirect, urlPath }) {
    const authenticated = await authenticate({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ path: '/login' });
    }
  },

  setup() {
    const $q = useQuasar();
    const { store, fetch } = useVideos();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetch();
        await done(!store.isFetchable);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      store.reset();
      done();
    };

    const showFilters = (): void => {
      $q.dialog({
        component: Filters,
        componentProps: {
          maximized: true,
          position: 'right',
          transitionShow: 'slide-left',
          transitionHide: 'slide-right',
        },
      });
    };

    const filters = computed(() => filter(store.query.filter));
    const sort = computed(() => store.query.sort);

    useMeta(() => ({ title: 'Videos' }));
    watch(filters, () => store.reset(), { deep: true });
    watch(sort, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      showFilters,
      filters,
      store,
      sorters,
    };
  },
});
</script>
