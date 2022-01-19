<template>
  <page-hero class="q-mb-lg">
    {{ store.name }}

    <template #meta>
      <span v-if="episode">{{ episode }}</span>
      <span>{{ duration }}</span>
      <span>{{ released }}</span>
    </template>
  </page-hero>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { dateFormat, timeFormat } from 'src/helpers';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoHero',

  components: {
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
  },

  setup() {
    const { store } = useVideo();

    const episode = computed(() => store.data?.production_code);
    const released = computed(() => dateFormat(store.data?.released_at || store.data?.created_at, 'YYYY'));
    const duration = computed(() => timeFormat(store.data?.duration));

    return {
      store,
      episode,
      released,
      duration,
    };
  },
});
</script>
