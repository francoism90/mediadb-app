<template>
  <div class="container">
    <h1 class="hero-secondary">
      Similar Videos
    </h1>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="state.id || 0"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-md">
          <q-intersection
            v-for="(item, index) in state.data"
            :key="index"
            class="col-xs-12 col-sm-6 video-item"
          >
            <video-item :video="item" />
          </q-intersection>
        </div>

        <template #loading>
          <div class="row no-wrap justify-center q-my-md">
            <q-spinner-oval
              color="primary"
              size="2em"
            />
          </div>
        </template>
      </q-infinite-scroll>
    </q-pull-to-refresh>
  </div>
</template>

<script lang="ts">
import { useSimilar } from 'src/composables/useSimilar';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent, onBeforeMount, watch } from 'vue';

export default defineComponent({
  name: 'VideoSimilar',

  components: {
    VideoItem: defineAsyncComponent(() => import('components/videos/VideoItem.vue')),
  },

  setup() {
    const { state: video } = useVideo();
    const { populate, reset, state } = useSimilar(video.data?.id || '');

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await populate();
        await done(!state.links?.next);
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

    watch(() => video.data, () => reset());

    // watch(filters, () => store.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      state,
    };
  },
});
</script>
