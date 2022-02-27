<template>
  <q-page>
    <template v-if="state.error">
      <q-banner class="container q-py-lg">
        <template #avatar>
          <q-icon
            name="error_outline"
            color="primary"
          />
        </template>

        <span class="text-body2">
          Unable to Play Video. An error occurred. ({{ state.error || '404 - Not Found' }})
        </span>
      </q-banner>
    </template>

    <template v-else-if="state.data">
      <video-hero />
      <!-- <video-player /> -->
      <!-- <video-actions /> -->
      <!-- <video-tags /> -->
      <!-- <video-similar /> -->
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
    // VideoActions: defineAsyncComponent(() => import('components/video/VideoActions.vue')),
    VideoHero: defineAsyncComponent(() => import('components/video/VideoHero.vue')),
    // VideoPlayer: defineAsyncComponent(() => import('components/video/VideoPlayer.vue')),
    // VideoSimilar: defineAsyncComponent(() => import('components/video/VideoSimilar.vue')),
    // VideoTags: defineAsyncComponent(() => import('components/video/VideoTags.vue')),
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
    const { initialize, subscribe, unsubscribe, state } = useVideo();

    useMeta(() => ({ title: state.data?.name || '' }));

    watch(() => props.id, async (value, oldValue) => {
      await initialize(value);

      unsubscribe(oldValue || '');
      subscribe(value || '');
    }, { immediate: true });

    return {
      state,
    };
  },
});
</script>
