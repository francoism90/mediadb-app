<template>
  <div
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
import { PlayerTooltip } from 'src/interfaces/player';
import { VideoModel } from 'src/interfaces/video';
import { capture } from 'src/services/vod';
import {
  computed, defineComponent, PropType, watch, ref,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  props: {
    model: {
      type: Object as PropType<VideoModel>,
      default: () => (<VideoModel>{}),
    },

    tooltip: {
      type: Object as PropType<PlayerTooltip>,
      default: () => (<PlayerTooltip>{}),
    },
  },

  setup(props) {
    const { formatTime } = useFilters();
    const { store } = usePlayer();

    const preview = ref<HTMLCanvasElement | null>();

    const duration = computed(() => store.properties?.duration || 0);
    const position = computed(() => props.tooltip.clientX - props.tooltip.sliderOffset.left);
    const percent = computed(() => (position.value / props.tooltip.sliderWidth) * 100);
    const time = computed(() => duration.value * (percent.value / 100));
    const timestamp = computed(() => formatTime(time.value));

    const tooltipStyle = computed(() => {
      const tooltipPosition = clamp(position.value - 80, 0, props.tooltip.sliderWidth - 160);
      return { marginLeft: `${tooltipPosition}px` };
    });

    const createPreview = async (): Promise<void> => {
      const ctx = preview.value?.getContext('2d');
      const img = new Image(160, 90);

      const response = await capture(props.model.id, Math.ceil(time.value));

      img.crossOrigin = 'anonymous';
      img.src = response.thumb_url || '';

      img.onload = () => {
        ctx?.drawImage(img, 0, 0);
      };
    };

    watch(percent, debounce(createPreview, 100));

    return {
      preview,
      percent,
      time,
      timestamp,
      tooltipStyle,
    };
  },
});
</script>
