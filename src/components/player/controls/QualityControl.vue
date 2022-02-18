<template>
  <div class="player-video-control q-gutter-x-md">
    <template v-if="store.isLoading">
      <q-spinner size="20px" />
    </template>

    <span class="text-weight-medium">{{ resolution?.label }}</span>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QualityControl',

  setup() {
    const { store, resolution } = usePlayer();

    return {
      store,
      resolution,
    };
  },
});
</script>
