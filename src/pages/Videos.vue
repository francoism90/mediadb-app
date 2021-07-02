<template>
  <q-page class="container">
    <q-toolbar class="q-py-lg">
      <q-select
        v-model="store.query.sort"
        :options="sorters"
        borderless
        class="q-px-none text-caption"
        dense
        dropdown-icon="expand_more"
        emit-value
        hide-bottom-space
        map-options
        options-dense
        popup-content-class="bg-grey-10"
      >
        <template #prepend>
          <span class="mobile-hide text-caption">Sort by</span>
        </template>
      </q-select>

      <q-space />

      <q-btn
        icon="filter_list"
        label="Filters"
        color="grey-5"
        outline
        @click="showFilters"
      />
    </q-toolbar>

    <q-pull-to-refresh
      :key="store.id"
      @refresh="onRefresh"
    >
      <q-infinite-scroll @load="onLoad">
        <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 video-item"
          >
            <item :video="item" />
          </q-intersection>
        </div>

        <template #loading>
          <div class="row no-wrap justify-center q-my-md">
            <q-spinner-orbit
              color="primary"
              size="3em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { useMeta, useQuasar } from 'quasar';
import Filters from 'src/components/videos/Filters.vue';
import Item from 'src/components/videos/Item.vue';
import useVideos from 'src/composables/useVideos';
import { authenticate } from 'src/services/auth';
import { defineComponent, watch } from 'vue';

const sorters = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Recent', value: '-created_at' },
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
    const { store, fetchAll } = useVideos();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetchAll();
        await done(store.isDone);
      } catch {
        await done(true);
      }
    };

    const showFilters = (): void => {
      $q.dialog({
        component: Filters,
        componentProps: {
          position: 'right',
          maximized: true,
          transitionShow: 'slide-left',
          transitionHide: 'slide-right',
        },
      });
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      store.reload();
      done();
    };

    watch(store.query, store.reload, { deep: true });

    useMeta(() => ({ title: 'Videos' }));

    return {
      onLoad,
      onRefresh,
      showFilters,
      store,
      sorters,
    };
  },
});
</script>
