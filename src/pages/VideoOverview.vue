<template>
  <q-page class="container">
    <page-hero>
      Video Library
      <template #meta>
        <span>44316 videos</span>
      </template>
    </page-hero>

    <video-query />

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="store.id"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-xl">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-6 video-item-placeholder"
          >
            <video-item :video="item" />
          </q-intersection>
        </div>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'VideoOverview',

  components: {
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
    VideoItem: defineAsyncComponent(() => import('components/videos/VideoItem.vue')),
    VideoQuery: defineAsyncComponent(() => import('src/components/videos/VideosQuery.vue')),
  },

  async preFetch({ redirect, urlPath }) {
    const authenticated = await check({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ name: 'login' });
    }
  },

  setup() {
    const { fetch, store, filters } = useVideos();

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

    useMeta(() => ({ title: 'Videos' }));

    watch(filters, () => store.reset(), { deep: true });

    return {
      store,
      onLoad,
      onRefresh,
    };
  },
});
</script>
