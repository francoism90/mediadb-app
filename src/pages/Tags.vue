<template>
  <q-page class="container">
    <q-toolbar class="bg-dark q-py-md">
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

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="store.id"
        @load="onLoad"
      >
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
import { useMeta } from 'quasar';
import Item from 'src/components/tags/Item.vue';
import useTags from 'src/composables/useTags';
import { authenticate } from 'src/services/auth';
import { computed, defineComponent, watch } from 'vue';

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
    const { store, fetch } = useTags();

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

    const filters = computed(() => filter(store.query.filter));
    const sort = computed(() => store.query.sort);

    useMeta(() => ({ title: 'Tags' }));
    watch(filters, () => store.reset(), { deep: true });
    watch(sort, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      store,
      sorters,
    };
  },
});
</script>
