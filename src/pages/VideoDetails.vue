<template>
  <q-page :key="state.data?.id">
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
      <video-player />
      <video-actions />
      <video-similar />
    </template>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent, PropType, watch } from 'vue';

export default defineComponent({
  name: 'VideoDetails',

  components: {
    VideoActions: defineAsyncComponent(() => import('components/video/VideoActions.vue')),
    VideoHero: defineAsyncComponent(() => import('components/video/VideoHero.vue')),
    VideoPlayer: defineAsyncComponent(() => import('components/video/VideoPlayer.vue')),
    VideoSimilar: defineAsyncComponent(() => import('components/video/VideoSimilar.vue')),
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
    const { check } = useSession();
    const { error } = await check();

    if (error.value) {
      redirect({ name: 'login', query: { redirect: urlPath } });
    }
  },

  setup(props) {
    const { fetch, subscribe, unsubscribe, state } = useVideo();

    useMeta(() => ({ title: state.data?.name || '' }));

    watch(() => props.id, async (value, oldValue) => {
      await fetch(value);

      unsubscribe(oldValue || '');
      subscribe(value || '');
    }, { immediate: true });

    return {
      state,
    };
  },
});
</script>
