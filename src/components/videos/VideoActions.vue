<template>
  <div class="q-gutter-sm">
    <q-btn
      class="q-pa-sm"
      color="grey-10"
      icon="o_movie"
      @click="edit"
    />

    <q-btn
      class="q-pa-sm"
      color="grey-10"
      :icon="following"
      @click="toggleFollow"
    />

    <q-btn
      class="q-pa-sm"
      color="grey-10"
      :icon="favorited"
      @click="toggleFavorite"
    />
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { VideoModel } from 'src/interfaces';
import { computed, defineAsyncComponent, defineComponent, PropType } from 'vue';

const editComponent = defineAsyncComponent(() => import('components/videos/VideoEditor.vue'));

export default defineComponent({
  name: 'VideoActions',

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const { favorite, follow } = useVideo();
    const $q = useQuasar();

    const favorited = computed(() => (props.video.favorite === true ? 'favorite' : 'favorite_border'));
    const following = computed(() => (props.video.following === true ? 'watch_later' : 'o_watch_later'));

    const toggleFavorite = async () => favorite(props.video.id);
    const toggleFollow = async () => follow(props.video.id);

    const edit = () => $q.dialog({
      component: editComponent,
      componentProps: {
        id: props.video.id,
      },
    });

    return {
      favorited,
      following,
      edit,
      toggleFavorite,
      toggleFollow,
    };
  },
});
</script>
