<template>
  <q-page class="container">
    <div class="hero">
      <h1><span>Video Library</span></h1>
      <p class="hero-subtitle">
        Search Results for: lorem ipsum dolor
      </p>
    </div>

    <q-toolbar class="q-pb-xl">
      <q-input
        placeholder="Enter a keyword..."
        class="full-width"
        square
        outlined
      />
    </q-toolbar>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="store.id"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-xl">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-6 video-item"
          >
            <video-item :video="item" />
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
import { useMeta, useQuasar } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, watch } from 'vue';

const filterComponent = defineAsyncComponent(() => import('components/videos/VideoFilters.vue'));

export default defineComponent({
  name: 'VideoOverview',

  components: {
    VideoItem: defineAsyncComponent(() => import('components/videos/VideoCard.vue')),
  },

  async preFetch({ redirect, urlPath }) {
    const authenticated = await check({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ name: 'login' });
    }
  },

  setup() {
    const $q = useQuasar();
    const { fetch, store, filters, sorters } = useVideos();

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

    useMeta(() => ({ title: 'Videos' }));

    watch(filters, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      toggleFilters,
      filters,
      store,
      sorters,
    };
  },
});
</script>
