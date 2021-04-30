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

    <template v-if="video && video.id">
      <video-player
        :module="`video-${id}`"
        :video="video"
      />

      <div class="container">
        <video-details
          v-if="video.id"
          :video="video"
        />

        <q-separator
          color="primary"
          size="3px"
        />

        <video-related :video="video" />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import VideoPlayer from 'src/components/player/Video.vue';
import VideoDetails from 'src/components/video/Details.vue';
import VideoRelated from 'src/components/video/Related.vue';
import useVideo from 'src/composables/useVideo';
import {
  defineComponent, onBeforeUnmount, onMounted, PropType, toRefs, watch,
} from 'vue';

export interface Props {
  id: string,
  slug?: string | null
}

export default defineComponent({
  name: 'VideoPage',

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
      required: false,
      default: null,
    },
  },

  setup(props: Props) {
    const { id } = toRefs(props);
    const {
      subscribe, unsubscribe, errors, video,
    } = useVideo({ id });

    onMounted(() => subscribe(id.value));

    watch(id, (value, oldValue): void => {
      subscribe(value);
      unsubscribe(oldValue);
    });

    onBeforeUnmount(() => unsubscribe(id.value));

    return {
      errors,
      video,
    };
  },
});
</script>
