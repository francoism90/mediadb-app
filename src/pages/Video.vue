<template>
  <q-page :key="id">
    {{ id }}
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

    <template v-if="video && video.id">
      <video-player :video="video" />

      <div class="container">
        <video-details :video="video" />

        <q-separator
          color="primary"
          size="3px"
        />

        <!-- <video-related :video="video" /> -->
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { authenticate } from 'src/services/auth';
import VideoPlayer from 'src/components/player/Video.vue';
import VideoDetails from 'src/components/video/Details.vue';
// import VideoRelated from 'src/components/video/Related.vue';
import useVideo from 'src/composables/useVideo';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, toRefs, watch,
} from 'vue';

export interface Props {
  id: string,
  slug?: string | null
}

export default defineComponent({
  name: 'Video',

  components: {
    VideoDetails,
    VideoPlayer,
    // VideoRelated,
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

  setup(props: Props) {
    const { id } = toRefs(props);

    const {
      subscribe, unsubscribe, errors, video,
    } = useVideo({ id });

    useMeta(() => ({
      title: video.value?.name || '',
    }));

    onMounted(() => subscribe(id.value));
    onBeforeUnmount(() => unsubscribe(id.value));

    watch(id, (value, oldValue): void => {
      subscribe(value);
      unsubscribe(oldValue);
    });

    return {
      errors,
      video,
    };
  },
});
</script>
