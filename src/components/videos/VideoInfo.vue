<template>
  <div
    v-if="store.id"
    class="video-details q-py-md"
  >
    <div class="q-py-sm row justify-between">
      <div class="col-xs-12 col-sm-8">
        <video-title :video="store.data" />
      </div>

      <div class="col-auto">
        <video-actions :video="store.data" />
      </div>
    </div>

    <video-metadata :video="store.data" />
  </div>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoInfo',

  components: {
    VideoActions: defineAsyncComponent(() => import('components/videos/VideoActions.vue')),
    VideoMetadata: defineAsyncComponent(() => import('src/components/videos/VideoMetadata.vue')),
    VideoTitle: defineAsyncComponent(() => import('src/components/videos/VideoTitle.vue')),
  },

  setup() {
    const { store } = useVideo();

    return {
      store,
    };
  },
});
</script>
