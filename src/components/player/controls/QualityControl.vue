<template>
  <div class="q-gutter-x-md">
    <template v-if="store.isLoading">
      <q-spinner
        color="white"
        size="24px"
      />
    </template>

    <span class="text-weight-medium text-white">{{ resolution?.label }}</span>
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
