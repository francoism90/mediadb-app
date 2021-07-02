<template>
  <div
    v-if="percent > 0"
    class="player-tooltip desktop-only"
    :style="tooltipStyle"
  >
    <q-img
      v-if="cue"
      :src="cue.text || ''"
      no-spinner
      no-transition
      width="160px"
      height="90px"
      class="player-tooltip-thumbnail"
    />

    <div class="text-white text-center q-py-xs">
      {{ timestamp }}
    </div>
  </div>
</template>

<script lang="ts">
import { clamp, find } from 'lodash';
import useFilters from 'src/composables/useFilters';
import usePlayer from 'src/composables/usePlayer';
import { PlayerTooltip } from 'src/interfaces/player';
import {
  computed, defineComponent, PropType, toRefs,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  props: {
    tooltip: {
      type: Object as PropType<PlayerTooltip>,
      required: true,
    },
  },

  setup(props) {
    const { tooltip } = toRefs(props);

    const { formatTime } = useFilters();
    const { store } = usePlayer();

    const duration = computed(() => store.properties?.duration || 0);
    const position = computed(() => tooltip.value.clientX - tooltip.value.sliderOffset.left);
    const percent = computed(() => (position.value / tooltip.value.sliderWidth) * 100);
    const time = computed(() => duration.value * (percent.value / 100));
    const timestamp = computed(() => formatTime(time.value));

    const cue = computed(() => {
      const track = find(store.properties?.textTracks, { id: 'sprite' }) as TextTrack | null;
      const cues = track?.cues as TextTrackCueList || undefined;

      return find(
        cues, (o) => o.startTime >= time.value || o.startTime >= (time.value - 30),
      );
    });

    const tooltipStyle = computed(() => {
      const tooltipPosition = clamp(position.value - 80, 0, tooltip.value.sliderWidth - 160);
      return { marginLeft: `${tooltipPosition}px` };
    });

    return {
      cue,
      percent,
      timestamp,
      tooltipStyle,
    };
  },
});
</script>
