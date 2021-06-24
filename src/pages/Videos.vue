<template>
  <q-page class="container">
    <!-- <q-toolbar class="q-py-lg">
      <filters />
    </q-toolbar> -->

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
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
// import Filters from 'src/components/videos/Filters.vue';
import Item from 'src/components/videos/Item.vue';
import useVideos from 'src/composables/useVideos';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'IndexPage',

  components: {
    Item,
    // Filters,
  },

  setup() {
    const { store, fetchAll, reset } = useVideos();
    const { id, data } = store;

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
      reset();
      done();
    };

    useMeta(() => ({
      title: 'Videos',
    }));

    return {
      onLoad,
      onRefresh,
      id,
      data,
    };
  },
});
</script>
