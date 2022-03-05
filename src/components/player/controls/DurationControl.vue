<template>
  <div class="player-video-control q-px-sm">
    <span class="text-caption">{{ time }} / {{ duration }}</span>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { timeFormat } from 'src/helpers';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'DurationControl',

  setup() {
    const { state } = usePlayer();

    const duration = computed(() => timeFormat(state.duration));
    const time = computed(() => timeFormat(state.time));

    return {
      duration,
      time,
    };
  },
});
</script>
