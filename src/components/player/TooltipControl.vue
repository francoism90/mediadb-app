<template>
  <div
    v-if="percent >= 0 && percent <= 100"
    class="player-tooltip desktop-only"
    :style="{ marginLeft: `${margin}px` }"
  >
    <canvas
      ref="container"
      width="160"
      height="90"
      class="player-tooltip-thumbnail"
    />

    <div class="text-white text-center q-py-xs">
      {{ timestamp }}
    </div>
  </div>
</template>

<script lang="ts">
import { clamp, debounce, find, inRange } from 'lodash';
import useDash from 'src/composables/useDash';
import useFilters from 'src/composables/useFilters';
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  setup() {
    const { formatTime } = useFilters();
    const { store } = useDash();

    const container = ref<HTMLCanvasElement | null>();

    const position = computed(() => store.tooltip?.clientX - store.tooltip.sliderOffset?.left);
    const margin = computed(() => clamp(position.value - 80, 0, store.tooltip?.sliderWidth - 160));
    const percent = computed(() => (position.value / store.tooltip?.sliderWidth) * 100 || 0);
    const time = computed(() => store.properties?.duration * (percent.value / 100) || 0);
    const timestamp = computed(() => formatTime(time.value));

    const render = (): void => {
      const sprite = find(store.properties.textTracks, { label: 'sprite' });
      const cue = find(
        sprite?.cues,
        (o: VTTCue) => inRange(time.value, o.startTime, o.endTime),
      ) as VTTCue;

      const ctx = container.value?.getContext('2d');
      const img = new Image(160, 90);

      img.crossOrigin = 'anonymous';
      img.src = cue?.text || '';
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    };

    watch(percent, debounce(render, 50));

    return {
      container,
      margin,
      percent,
      store,
      time,
      timestamp,
    };
  },
});
</script>
