<template>
  <div class="hero container q-mb-md">
    <h1>{{ title }}</h1>
    <p>
      <span v-if="episode">{{ episode }}</span>
      <span>{{ duration }}</span>
      <span>{{ released }}</span>
    </p>
  </div>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { dateFormat, timeFormat } from 'src/helpers';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoHero',

  setup() {
    const { state } = useVideo();

    const title = computed(() => state.data?.title);
    const episode = computed(() => state.data?.production_code);
    const released = computed(() => dateFormat(state.data?.released_at || state.data?.created_at, 'YYYY'));
    const duration = computed(() => timeFormat(state.data?.duration));

    return {
      title,
      episode,
      released,
      duration,
    };
  },
});
</script>
