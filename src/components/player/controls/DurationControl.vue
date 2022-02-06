<template>
  <span class="player-video-control text-caption">{{ time }} / {{ duration }}</span>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'DurationControl',

  setup() {
    const { duration, time } = usePlayer();

    return {
      duration,
      time,
    };
  },
});
</script>
