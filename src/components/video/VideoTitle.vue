<template>
  <video-hero />
  <video-player />
  <video-actions />
  <video-similar />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoTitle',

  components: {
    VideoHero: defineAsyncComponent(() => import('components/video/VideoHero.vue')),
    VideoActions: defineAsyncComponent(() => import('components/video/VideoActions.vue')),
    VideoSimilar: defineAsyncComponent(() => import('components/video/VideoSimilar.vue')),
    VideoPlayer: defineAsyncComponent(() => import('components/player/VideoPlayer.vue')),
  },
});
</script>
