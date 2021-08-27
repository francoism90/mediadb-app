<template>
  <q-page :key="id">
    <template v-if="errors && errors.message">
      <q-banner class="container q-py-lg">
        <template #avatar>
          <q-icon
            name="error_outline"
            color="primary"
          />
        </template>

        <span class="text-body2">
          Unable to Play Video. An error occurred.
        </span>
      </q-banner>
    </template>

    <template v-if="videoStore.isReady">
      <video-player />

      <div class="container">
        <video-details />

        <q-separator
          color="primary"
          size="3px"
        />

        <video-related />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import VideoPlayer from 'src/components/player/Video.vue';
import VideoDetails from 'src/components/video/Details.vue';
import VideoRelated from 'src/components/video/Related.vue';
import usePlayer from 'src/composables/usePlayer';
import useVideo from 'src/composables/useVideo';
import { authenticate } from 'src/services/auth';
import {
  defineComponent, onBeforeUnmount, PropType, watch,
} from 'vue';

export default defineComponent({
  name: 'Video',

  components: {
    VideoDetails,
    VideoPlayer,
    VideoRelated,
  },

  props: {
    id: {
      type: String as PropType<string>,
      required: true,
    },

    slug: {
      type: String as PropType<string>,
      default: null,
    },
  },

  async preFetch({ redirect, urlPath }) {
    const authenticated = await authenticate({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ path: '/login' });
    }
  },

  setup(props) {
    const { initialize, subscribe, unsubscribe, errors, store: videoStore } = useVideo();
    const { store: playerStore } = usePlayer();

    watch(props, async (value, oldValue): Promise<void> => {
      await initialize(props.id);

      // Player
      playerStore.$reset();
      playerStore.populate({
        media: videoStore.data?.clip,
        live_url: videoStore.data?.live_url,
        vod_url: videoStore.data?.vod_url,
      });

      // WebSockets
      unsubscribe(oldValue?.id || '');
      subscribe(props?.id || '');
    }, { immediate: true });

    onBeforeUnmount(() => unsubscribe(props.id));
    useMeta(() => ({ title: videoStore.data?.name || '' }));

    return {
      errors,
      playerStore,
      videoStore,
    };
  },
});
</script>
