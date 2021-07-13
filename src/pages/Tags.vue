<template>
  <q-page class="container tag-list-container">
    <q-pull-to-refresh
      :key="store.id"
      @refresh="onRefresh"
    >
      <q-infinite-scroll @load="onLoad">
        <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 tag-item"
          >
            <item :tag="item" />
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

    <q-page-sticky
      expand
      position="top"
    >
      <q-toolbar class="bg-grey-12 container q-py-md">
        <q-select
          v-model.lazy="store.query.sort"
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
      </q-toolbar>
    </q-page-sticky>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import Item from 'src/components/tags/Item.vue';
import useTags from 'src/composables/useTags';
import { authenticate } from 'src/services/auth';
import { defineComponent, watch } from 'vue';

const sorters = [
  { label: 'Alphabetical', value: 'name' },
  { label: 'Randomize', value: 'random' },
  { label: 'Items', value: '-items' },
];

export default defineComponent({
  name: 'Tags',

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
    const { store, fetchAll } = useTags();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetchAll();
        await done(store.isDone);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      store.reload();
      done();
    };

    watch(store.query, store.reload, { deep: true });

    useMeta(() => ({ title: 'Tags' }));

    return {
      onLoad,
      onRefresh,
      store,
      sorters,
    };
  },
});
</script>
