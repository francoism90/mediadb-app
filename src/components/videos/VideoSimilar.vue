<template>
  <div class="video-similar q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="similar.id"
        @load="onLoad"
      >
        <div class="row justify-start items-start content-start q-col-gutter-md">
          <q-intersection
            v-for="(item, index) in similar.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 video-item"
          >
            <item :video="item" />
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
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoSimilar',

  components: {
    Item: defineAsyncComponent(() => import('components/videos/VideoCard.vue')),
  },

  setup() {
    const { store: similar, fetch } = useSimilar();
    const { store: video } = useVideo();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetch();
        await done(!similar.isFetchable);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      similar.reset();
      done();
    };

    return {
      similar,
      video,
      onLoad,
      onRefresh,
    };
  },
});
</script>
