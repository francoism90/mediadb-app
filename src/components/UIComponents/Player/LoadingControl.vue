<template>
  <q-spinner
    v-if="store.isWaiting"
    size="24px"
  />
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LoadingControl',

  setup() {
    const { store } = usePlayer();

    return {
      store,
    };
  },
});
</script>
