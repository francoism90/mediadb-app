<template>
  <q-page :key="id">
    <template v-if="message !== ''">
      <q-banner class="container q-py-lg">
        <template #avatar>
          <q-icon
            name="error_outline"
            color="primary"
          />
        </template>

        <span class="text-body2">
          Unable to Play Video. An error occurred. ({{ message }})
        </span>
      </q-banner>
    </template>

    <template v-else-if="store.isReady">
      <dash-player />

      <div class="container">
        <video-details />

        <q-separator
          color="primary"
          size="3px"
        />

        <video-similar />
      </div>
    </template>

    <template v-else>
      Loading...
    </template>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, PropType, watch } from 'vue';

export default defineComponent({
  name: 'VideoDetails',

  components: {
    DashPlayer: defineAsyncComponent(() => import('src/components/player/DashPlayer.vue')),
    VideoDetails: defineAsyncComponent(() => import('src/components/videos/VideoSection.vue')),
    VideoSimilar: defineAsyncComponent(() => import('src/components/videos/VideoSimilar.vue')),
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
    const authenticated = await check({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ name: 'login' });
    }
  },

  setup(props) {
    const { initialize, subscribe, unsubscribe, message, store } = useVideo();

    watch(() => props.id, async (value, oldValue): Promise<void> => {
      await initialize(value);

      // Init WebSockets
      unsubscribe(oldValue || '');
      subscribe(value || '');
    }, { immediate: true });

    useMeta(() => ({ title: store.data?.name || '' }));

    return {
      message,
      store,
    };
  },
});
</script>
