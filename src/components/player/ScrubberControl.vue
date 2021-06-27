<template>
  <div class="player-scrubber absolute-bottom">
    <!-- <tooltip-control
      v-if="tooltip && tooltip.time"
      :data="tooltip"
      :style="tooltipStyle"
    /> -->

    <q-slider
      ref="slider"
      :disable="store.properties.readyState === 0"
      :model-value="store.properties.currentTime"
      :min="0.0"
      :max="store.properties.duration"
      :step="0"
      :style="bufferStyle"
      color="primary"
      @update:model-value="setCurrentTime"
    />

    <div class="row no-wrap justify-between items-center content-center">
      <div class="col">
        <div class="text-caption text-white">
          {{ currentTime }} / {{ duration }}
        </div>
      </div>

      <!-- <div class="col-auto">
        <div class="q-col-gutter-sm">
          <fullscreen-control :module="module" />
        </div>
      </div> -->
    </div>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters';
import usePlayer from 'src/composables/usePlayer';
import { defineComponent, computed } from 'vue';

export default defineComponent({
  name: 'ScrubberControl',

  setup() {
    const { formatTime } = useFilters();
    const { store } = usePlayer();

    const bufferedPct = computed(() => {
      const buffered = store.properties.buffered || <TimeRanges>{};
      const duration = store.properties.duration || 0;

      if (!(buffered instanceof TimeRanges) || buffered.length === 0) {
        return 0;
      }

      return Math.round((buffered.end(0) / duration) * 100);
    });

    const bufferedRemainingPct = computed(() => Math.round(100 - bufferedPct.value));

    const bufferStyle = computed(() => ({
      '--buffer': `${bufferedPct.value}%`,
      '--remaining': `${bufferedRemainingPct.value}%`,
    }));

    const currentTime = computed(() => formatTime(store.properties.currentTime || 0));
    const duration = computed(() => formatTime(store.properties.duration || 0));

    const setCurrentTime = (value: number): void => {
      store.dispatch({ time: value });
    };

    return {
      setCurrentTime,
      bufferStyle,
      currentTime,
      duration,
      store,
    };
  },

});
</script>
