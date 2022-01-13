<template>
  <q-spinner
    v-if="loading"
    size="24px"
  />
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingControl',

  setup() {
    const { store } = usePlayer();

    const loading = computed(() => store.isLoading);

    return {
      loading,
    };
  },
});
</script>
