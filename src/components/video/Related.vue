<template>
  <div class="video-related q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-separator />

    <q-pull-to-refresh
      :key="id"
      @refresh="onRefresh"
    >
      <q-infinite-scroll @load="onLoad">
        <div class="row wrap justify-start items-start content-start q-col-gutter-lg">
          <q-intersection
            v-for="(item, index) in data"
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
import useVideos from 'src/composables/useVideos';
import { Video, VideosParameters } from 'src/interfaces/video';
import { defineComponent, PropType, toRefs } from 'vue';

export default defineComponent({
  name: 'VideoDetails',

  components: {
    Item,
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true,
    },
  },

  setup(props) {
    const { video } = toRefs(props);

    const {
      fetchVideos, isLoadable, setParams, id, data, meta,
    } = useVideos({
      module: `video-related-${video.value.id}`,
      params: <VideosParameters>{
        sort: 'recommended',
        'filter[related]': video.value.id,
        'page[number]': 1,
        'page[size]': 12,
      },
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetchVideos();
        await done(!isLoadable.value);
      } catch {
        //
      } finally {
        //
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = async (done: Function): Promise<void> => {
      await setParams({
        params: { 'page[number]': 1 },
        reset: true,
      });

      done();
    };

    return {
      onLoad,
      onRefresh,
      id,
      data,
      meta,
    };
  },
});
</script>
