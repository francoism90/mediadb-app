<template>
  <q-toolbar class="q-py-lg no-wrap justify-center items-center content-center">
    <q-btn-group unelevated>
      <q-btn
        class="q-pa-sm"
        color="grey-10"
        icon="movie"
        @click="edit"
      />

      <q-separator vertical />

      <q-btn
        class="q-pa-sm"
        color="grey-10"
        :icon="following"
        @click="toggleFollow"
      />

      <q-separator vertical />

      <q-btn
        class="q-pa-sm"
        color="grey-10"
        :icon="favorited"
        @click="toggleFavorite"
      />
    </q-btn-group>

    <q-separator
      spaced="lg"
      color="grey-4"
      vertical
    />

    <div
      class="column inline no-wrap items-center"
      style="height: 35px;"
    >
      <div class="col">
        <span class="text-grey-5 text-weight-bold">{{ store.data.views || 0 }}</span>
      </div>
      <div class="col-auto">
        <span class="text-grey-5">views</span>
      </div>
    </div>
  </q-toolbar>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

const editComponent = defineAsyncComponent(() => import('components/video/VideoEditor.vue'));

export default defineComponent({
  name: 'VideoActions',

  setup() {
    const { store, favorite, follow } = useVideo();
    const $q = useQuasar();

    const favorited = computed(() => (store.data?.favorite === true ? 'favorite' : 'favorite_border'));
    const following = computed(() => (store.data?.following === true ? 'watch_later' : 'o_watch_later'));

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
      edit,
      toggleFavorite,
      toggleFollow,
    };
  },
});
</script>
