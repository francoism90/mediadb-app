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

    <template v-if="store.isReady">
      <video-player :source="source" />

      <div class="container">
        <video-details />

        <q-separator
          color="primary"
          size="3px"
        />

        <video-similar />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import useVideo from 'src/composables/useVideo';
import { PlayerSource } from 'src/interfaces/player';
import { authenticate } from 'src/services/auth';
import { computed, defineAsyncComponent, defineComponent, PropType, watch } from 'vue';

export default defineComponent({
  name: 'Video',

  components: {
    VideoPlayer: defineAsyncComponent(() => import('components/player/DashProvider.vue')),
    VideoDetails: defineAsyncComponent(() => import('components/video/Details.vue')),
    VideoSimilar: defineAsyncComponent(() => import('components/video/Similar.vue')),
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
    const { initialize, subscribe, unsubscribe, errors, store } = useVideo();

    const source = computed(() => <PlayerSource>{
      id: store.data?.id,
      url: store.data?.dash_url,
    });

    watch(() => props.id, async (value, oldValue): Promise<void> => {
      await initialize(value);

      // Init WebSockets
      unsubscribe(oldValue || '');
      subscribe(value || '');
    }, { immediate: true });

    useMeta(() => ({ title: store.data?.name || '' }));

    return {
      errors,
      source,
      store,
    };
  },
});
</script>
