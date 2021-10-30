<template>
  <span class="text-caption">{{ currentTime }} / {{ duration }}</span>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { timeFormat } from 'src/utils/datetime';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DurationControl',

  setup() {
    const { store } = usePlayer();

    const currentTime = computed(() => timeFormat(store.properties?.time));
    const duration = computed(() => timeFormat(store.properties?.duration));

    return {
      currentTime,
      duration,
      store,
    };
  },
});
</script>
