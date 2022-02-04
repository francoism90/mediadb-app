<template>
  <q-toolbar class="q-py-sm no-wrap justify-center items-center content-center">
    <div class="q-gutter-x-none">
      <q-btn
        class="btn-primary transparent q-pa-sm"
        icon="movie"
        @click="edit"
      />

      <q-btn
        class="btn-primary transparent q-pa-sm"
        :icon="following"
        @click="toggleFollow"
      />

      <q-btn
        class="btn-primary transparent q-pa-sm"
        :icon="favorited"
        @click="toggleFavorite"
      />
    </div>

    <q-separator
      class="seperator"
      spaced="lg"
      vertical
    />

    <div class="video-views column inline no-wrap items-center">
      <div class="col">
        <span class="text-weight-bold">{{ views }}</span>
      </div>
      <div class="col-auto">
        <span class="video-views-meta text-weight-medium">views</span>
      </div>
    </div>
  </q-toolbar>

  <video-tags :tags="store.data.tags" />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { average } from 'src/helpers/number';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

const editComponent = defineAsyncComponent(() => import('components/video/VideoEditor.vue'));

export default defineComponent({
  name: 'VideoActions',

  components: {
    VideoTags: defineAsyncComponent(() => import('components/video/VideoTags.vue')),
  },

  setup() {
    const { store, favorite, follow } = useVideo();
    const $q = useQuasar();

    const favorited = computed(() => (store.data?.favorite === true ? 'favorite' : 'favorite_border'));
    const following = computed(() => (store.data?.following === true ? 'watch_later' : 'o_watch_later'));
    const views = computed(() => average(store.data?.views || 0));

    const toggleFavorite = async () => favorite(store.id);
    const toggleFollow = async () => follow(store.id);

    const edit = () => $q.dialog({
      component: editComponent,
      componentProps: {
        id: store.id,
      },
    });

    return {
      store,
      favorited,
      following,
      views,
      edit,
      toggleFavorite,
      toggleFollow,
    };
  },
});
</script>
