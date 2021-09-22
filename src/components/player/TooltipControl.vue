<template>
  <div
    class="player-tooltip desktop-only"
    :style="{ marginLeft: `${margin}px` }"
  >
    <q-img
      :src="thumbnail"
      class="player-tooltip-thumbnail"
      height="90"
      width="160"
      no-spinner
      no-transition
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
import { PlayerThumbnail } from 'src/interfaces/player';
import { getBlob } from 'src/services/api';
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  setup() {
    const { formatTime } = useFilters();
    const { store } = useDash();

    const thumbnail = ref<string>();

    const offset = computed(() => store.tooltip.sliderOffset?.left || 0);
    const width = computed(() => store.tooltip?.sliderWidth || 0);
    const position = computed(() => store.tooltip?.clientX - offset.value || 0);
    const margin = computed(() => clamp(position.value - 80, 0, width.value - 160));
    const percent = computed(() => clamp((position.value / width.value) * 100, 0, 100));
    const time = computed(() => (store.properties?.duration || 0) * (percent.value / 100));
    const timestamp = computed(() => formatTime(time.value || 0));

    const render = async (): Promise<void> => {
      const cue = find(
        store.sprite?.cues,
        (o: VTTCue) => inRange(time.value, o.startTime, o.endTime),
      ) as VTTCue;

      if (!cue) return;

      const text = JSON.parse(cue?.text) as PlayerThumbnail;

      const response = await getBlob(text.url || '');
      const reader = new window.FileReader();

      reader.readAsDataURL(response);
      reader.onload = () => {
        thumbnail.value = reader.result?.toString() || '';
      };
    };

    watch(percent, debounce(render, 50));

    return {
      store,
      margin,
      percent,
      thumbnail,
      time,
      timestamp,
    };
  },
});
</script>
