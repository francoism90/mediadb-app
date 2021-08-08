<template>
  <div class="video-related q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="store.id"
        @load="onLoad"
      >
        <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in store.data"
            :key="index"
            class="col-xs-12 col-sm-6 col-md-4 col-lg-4 col-xl-4 video-item"
          >
            <item :video="item" />
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
  </div>
</template>

<script lang="ts">
import Item from 'src/components/videos/Item.vue';
import useRelated from 'src/composables/useRelated';
import { VideoModel } from 'src/interfaces/video';
import {
  defineComponent, PropType, onBeforeMount, watch,
} from 'vue';

export default defineComponent({
  name: 'VideoRelated',

  components: {
    Item,
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const { fetchAll, initialize, store } = useRelated();

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
      initialize(props.video);
      done();
    };

    onBeforeMount(() => initialize(props.video));
    watch(props.video, () => initialize(props.video), { deep: true });

    return {
      onLoad,
      onRefresh,
      store,
    };
  },
});
</script>
