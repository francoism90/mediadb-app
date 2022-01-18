<template>
  <q-page class="container">
    <page-hero>
      <template #main>
        Video Library
      </template>

      <template #footer>
        <div class="q-gutter-sm">
          <q-chip
            square
            clickable="false"
            color="transparent"
            class="video-overview-chip"
            label="44316 videos"
            icon="o_movie"
          />

          <q-chip
            square
            clickable="false"
            color="transparent"
            class="video-overview-chip"
            label="44316 tags"
            icon="o_tag"
          />
        </div>
      </template>
    </page-hero>

    <q-toolbar class="q-pb-xl">
      <q-input
        borderless
        square
        placeholder="Enter a keyword, tag, ..."
        class="video-overview-search q-px-md full-width"
        input-class="text-grey-7 text-weight-medium"
      >
        <template #append>
          <q-icon
            name="filter_list"
            class="cursor-pointer"
            color="grey-6"
          />
        </template>
      </q-input>
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
            class="col-xs-12 col-sm-6 col-md-6 video-card-placeholder"
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
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
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
