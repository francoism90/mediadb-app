<template>
  <div class="player-scrubber absolute-bottom">
    <tooltip-control v-if="tooltip" />

    <q-slider
      ref="slider"
      :model-value="store.properties?.time || 0"
      :min="0.0"
      :max="store.properties?.duration || 0"
      :step="0"
      :style="{ '--buffer': `${buffered}%` }"
      color="primary"
      @mousemove="onMouseHover"
      @mouseleave="tooltip = false"
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
import { dom, QSlider } from 'quasar';
import FullscreenControl from 'src/components/player/FullscreenControl.vue';
import TooltipControl from 'src/components/player/TooltipControl.vue';
import useDash from 'src/composables/useDash';
import useFilters from 'src/composables/useFilters';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ScrubberControl',

  components: {
    FullscreenControl,
    TooltipControl,
  },

  setup() {
    const { formatTime } = useFilters();
    const { store } = useDash();

    const slider = ref<QSlider>();
    const tooltip = ref<boolean>();

    const buffered = computed(() => Math.round(store.properties?.buffered || 0));
    const currentTime = computed(() => formatTime(store.properties?.time));
    const duration = computed(() => formatTime(store.properties?.duration));

    const setCurrentTime = (payload: number): void => {
      store.time = +payload.toFixed(2);
    };

    const onMouseHover = (event: MouseEvent): void => {
      store.$patch({
        tooltip: {
          clientX: event.clientX,
          sliderOffset: dom.offset(slider.value?.$el || 0),
          sliderWidth: dom.width(slider.value?.$el || 0),
        },
      });

      tooltip.value = true;
    };

    return {
      onMouseHover,
      setCurrentTime,
      buffered,
      currentTime,
      duration,
      slider,
      store,
      tooltip,
    };
  },
});
</script>
