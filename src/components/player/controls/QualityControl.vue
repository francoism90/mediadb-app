<template>
  <q-list
    bordered
    dense
    separator
    class="player-menu"
  />
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'QualityControl',

  emits: ['setComponent'],

  setup() {
    const { store } = usePlayer();

    return {
      store,
    };
  },
});
</script>
