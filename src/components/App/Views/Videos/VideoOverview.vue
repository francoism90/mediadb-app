<template>
  <q-page class="container">
    <q-toolbar class="bg-dark q-py-lg">
      <q-select
        v-model.lazy="store.query.sort"
        :options="sorters"
        behavior="menu"
        class="q-px-none text-caption"
        dropdown-icon="expand_more"
        borderless
        emit-value
        dense
        hide-bottom-space
        map-options
        options-dense
        popup-content-class="menu bordered"
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
        @click="toggleFilters"
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
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-md">
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
import { fetch, sorters, store } from 'components/App/Views/Videos';
import { authenticated } from 'components/UIComponents/Sessions';
import { filter } from 'lodash';
import { useMeta, useQuasar } from 'quasar';
import { computed, defineAsyncComponent, defineComponent, watch } from 'vue';

const filterComponent = defineAsyncComponent(() => import('components/videos/Filters.vue'));

export default defineComponent({
  name: 'VideoOverview',

  components: {
    Item: defineAsyncComponent(() => import('components/videos/Item.vue')),
  },

  async preFetch({ redirect, urlPath }) {
    const authenticate = await authenticated({ redirectUri: urlPath });

    if (!authenticate) {
      redirect({ path: '/login' });
    }
  },

  setup() {
    const $q = useQuasar();

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

    const toggleFilters = (): void => {
      $q.dialog({
        component: filterComponent,
        componentProps: {
          maximized: true,
          position: 'right',
          transitionShow: 'slide-left',
          transitionHide: 'slide-right',
        },
      });
    };

    const filters = computed(() => filter(store.query.filter));
    const sorter = computed(() => store.query.sort);

    useMeta(() => ({ title: 'Videos' }));

    watch(filters, () => store.reset(), { deep: true });
    watch(sorter, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      toggleFilters,
      filters,
      sorters,
      store,
    };
  },
});
</script>
