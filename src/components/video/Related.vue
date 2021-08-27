<template>
  <div class="video-related q-py-md">
    <h1 class="text-h3 text-white ellipsis">
      More Like This
    </h1>

    <q-pull-to-refresh @refresh="onRefresh">
      <q-infinite-scroll
        :key="relatedStore.id"
        @load="onLoad"
      >
        <div class="row wrap justify-start items-start content-start q-col-gutter-sm">
          <q-intersection
            v-for="(item, index) in relatedStore.data"
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
import { filter } from 'lodash';
import Item from 'src/components/videos/Item.vue';
import useRelated from 'src/composables/useRelated';
import useVideo from 'src/composables/useVideo';
import { computed, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'VideoRelated',

  components: {
    Item,
  },

  setup() {
    const { store: relatedStore, fetch } = useRelated();
    const { store: videoStore } = useVideo();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetch();
        await done(!relatedStore.isFetchable);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      relatedStore.reset();
      done();
    };

    const videoId = computed(() => videoStore.data?.id || null);
    const filters = computed(() => filter(relatedStore.query.filter));
    const sort = computed(() => relatedStore.query.sort);

    watch(videoId, () => relatedStore.filter({ related: videoId.value }), { immediate: true });
    watch(filters, () => relatedStore.reset(), { deep: true });
    watch(sort, () => relatedStore.reset(), { deep: true });

    return {
      onLoad,
      onRefresh,
      relatedStore,
      videoStore,
    };
  },
});
</script>
