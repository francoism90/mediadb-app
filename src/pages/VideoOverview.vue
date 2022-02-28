<template>
  <q-page class="container">
    <video-filters />

    <q-pull-to-refresh
      class="q-py-lg"
      @refresh="onRefresh"
    >
      <q-infinite-scroll
        :key="state.id || 0"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in state.data"
            :key="index"
            class="col-xs-12 col-sm-6 video-item"
          >
            <video-item :item="item" />
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
import { fetch } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, onBeforeMount } from 'vue';

export default defineComponent({
  name: 'VideoOverview',

  components: {
    VideoItem: defineAsyncComponent(() => import('components/videos/VideoItem.vue')),
    VideoFilters: defineAsyncComponent(() => import('components/videos/VideoFilters.vue')),
  },

  async preFetch({ redirect, urlPath }) {
    const { data } = await fetch();

    if (!data.value) {
      redirect({ name: 'login', query: { redirect: urlPath } });
    }
  },

  setup() {
    const { populate, reset, state } = useVideos();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await populate();
        await done(false);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = async (done: Function): Promise<void> => {
      await reset();
      done();
    };

    onBeforeMount(() => populate());

    useMeta(() => ({ title: 'Videos' }));

    // watch(filters, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      state,
    };
  },
});
</script>
