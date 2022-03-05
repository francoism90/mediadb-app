<template>
  <div class="player-video-control q-px-sm">
    <q-spinner
      v-if="loading"
      size="20px"
    />
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingControl',

  setup() {
    const { state } = usePlayer();

    const loading = computed(() => !state.ready || !state.buffered);

    return {
      loading,
    };
  },
});
</script>
