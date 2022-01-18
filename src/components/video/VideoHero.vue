<template>
  <page-hero>
    {{ store.name }}

    <template #meta>
      <span>{{ store.duration }}</span>
      <span>{{ store.created }}</span>
    </template>
  </page-hero>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoHero',

  components: {
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
  },

  setup() {
    const { store } = useVideo();

    return {
      store,
    };
  },
});
</script>
