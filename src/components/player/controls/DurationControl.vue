<template>
  <span class="text-caption">{{ currentTime }} / {{ duration }}</span>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DurationControl',

  setup() {
    const { currentTime, duration } = usePlayer();

    return {
      currentTime,
      duration,
    };
  },
});
</script>
