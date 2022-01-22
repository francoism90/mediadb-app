<template>
  <q-page class="container">
    <video-filters />

    <q-pull-to-refresh
      class="q-py-lg"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :key="store.id"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-12 col-md-6 video-item-placeholder"
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
import { useMeta } from 'quasar';
import { useVideos } from 'src/composables/useVideos';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'VideoOverview',

  components: {
    VideoItem: defineAsyncComponent(() => import('components/videos/VideoItem.vue')),
    VideoFilters: defineAsyncComponent(() => import('components/videos/VideoFilters.vue')),
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
