<template>
  <div
    v-show="percent > 0"
    class="player-tooltip desktop-only"
    :style="tooltipStyle"
  >
    <canvas
      ref="preview"
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
import { clamp, debounce } from 'lodash';
import useFilters from 'src/composables/useFilters';
import usePlayer from 'src/composables/usePlayer';
import useVideo from 'src/composables/useVideo';
import { capture } from 'src/services/vod';
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  setup() {
    const { formatTime } = useFilters();
    const { store: playerStore } = usePlayer();
    const { store: videoStore } = useVideo();

    const preview = ref<HTMLCanvasElement | null>();

    const duration = computed(() => playerStore.properties?.duration || 0);
    const clientX = computed(() => playerStore.tooltip?.clientX || 0);
    const width = computed(() => playerStore.tooltip?.sliderWidth || 0);
    const offset = computed(() => playerStore.tooltip?.sliderOffset?.left || 0);
    const position = computed(() => clientX.value - offset.value);
    const percent = computed(() => (position.value / width.value) * 100 || 0);
    const time = computed(() => duration.value * (percent.value / 100));
    const timestamp = computed(() => formatTime(time.value));

    const tooltipStyle = computed(() => {
      const tooltipPosition = clamp(position.value - 80, 0, width.value - 160);
      return { marginLeft: `${tooltipPosition}px` };
    });

    const createPreview = async (): Promise<void> => {
      const response = await capture(videoStore.data?.id || '', Math.ceil(time.value));
      const ctx = preview.value?.getContext('2d');
      const img = new Image(160, 90);

      img.crossOrigin = 'anonymous';
      img.src = response.data?.capture_url || '';
      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    };

    watch(percent, debounce(createPreview, 50));

    return {
      playerStore,
      videoStore,
      preview,
      percent,
      time,
      timestamp,
      tooltipStyle,
    };
  },
});
</script>
