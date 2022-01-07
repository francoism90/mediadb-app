<template>
  <q-page :key="id">
    <template v-if="state.error">
      <q-banner class="container q-py-lg">
        <template #avatar>
          <q-icon
            name="error_outline"
            color="primary"
          />
        </template>

        <span class="text-body2">
          Unable to Play Video. An error occurred. ({{ state.error?.message }})
        </span>
      </q-banner>
    </template>

    <template v-else-if="state.ready">
      <video-player />

      <div class="container">
        <video-info />

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
import { useVideo } from 'src/composables/useVideo';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, PropType, watch } from 'vue';

export default defineComponent({
  name: 'VideoDetails',

  components: {
    VideoInfo: defineAsyncComponent(() => import('components/videos/VideoInfo.vue')),
    VideoPlayer: defineAsyncComponent(() => import('src/components/player/VideoPlayer.vue')),
    VideoSimilar: defineAsyncComponent(() => import('components/videos/VideoSimilar.vue')),
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
    const { initialize, subscribe, unsubscribe, state, store } = useVideo();

    watch(() => props.id, async (value, oldValue) => {
      await initialize(value);

      unsubscribe(oldValue || '');
      subscribe(value || '');
    }, { immediate: true });

    useMeta(() => ({ title: store.data?.name || '' }));

    return {
      state,
      store,
    };
  },
});
</script>
