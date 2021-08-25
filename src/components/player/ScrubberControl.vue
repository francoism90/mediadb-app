<template>
  <div class="player-scrubber absolute-bottom">
    <tooltip-control />

    <q-slider
      ref="slider"
      :disable="store.properties?.readyState === 0"
      :model-value="store.properties?.currentTime || 0"
      :min="0.0"
      :max="store.properties?.duration || 0"
      :step="0"
      :style="bufferStyle"
      color="primary"
      @mousemove="onMouseHover"
      @mouseleave="onMouseHover"
      @update:model-value="setCurrentTime"
    />

    <div class="row no-wrap justify-between items-center content-center">
      <div class="col">
        <div class="text-caption text-white">
          {{ currentTime }} / {{ duration }}
        </div>
      </div>

      <div class="col-auto">
        <div class="q-col-gutter-sm">
          <fullscreen-control />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters';
import usePlayer from 'src/composables/usePlayer';
import FullscreenControl from 'src/components/player/FullscreenControl.vue';
import TooltipControl from 'src/components/player/TooltipControl.vue';
import { defineComponent, computed, ref } from 'vue';
import { dom, QSlider } from 'quasar';

export default defineComponent({
  name: 'ScrubberControl',

  components: {
    FullscreenControl,
    TooltipControl,
  },

  setup() {
    const { formatTime } = useFilters();
    const { store } = usePlayer();

    const slider = ref<QSlider>();

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

    const setCurrentTime = (payload: number): void => {
      store.dispatch({ time: payload });
    };

    const onMouseHover = (event: MouseEvent): void => {
      store.capture({
        clientX: event.clientX,
        sliderWidth: dom.width(slider.value?.$el || 0),
        sliderOffset: dom.offset(slider.value?.$el || 0),
      });
    };

    return {
      setCurrentTime,
      onMouseHover,
      bufferStyle,
      currentTime,
      duration,
      slider,
      store,
    };
  },

});
</script>
