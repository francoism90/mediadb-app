<template>
  <template v-if="store.isLoading">
    <q-spinner size="24px" />
  </template>

  <span class="text-weight-medium text-white">{{ resolution?.label }}</span>
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
