<template>
  <video-hero />
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoTitle',

  components: {
    VideoHero: defineAsyncComponent(() => import('components/videos/VideoHero.vue')),
  },
});
</script>
