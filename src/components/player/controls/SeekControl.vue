<template>
  <tooltip-control
    v-if="seeker"
    :seeker-position="seeker"
    :seeker-offset="seekerOffset"
    :seeker-width="seekerWidth"
  />

  <q-slider
    ref="slider"
    :model-value="state.time || 0"
    :min="0.0"
    :max="state.duration || 0"
    :step="0"
    :style="{ '--buffer': `${buffered}%` }"
    class="player-video-control player-video-seeker"
    dense
    color="primary"
    tabindex="0"
    @mousemove="onMouseHover"
    @mouseleave="onMouseLeave"
    @update:model-value="setCurrentTime"
  />
</template>

<script lang="ts">
import { set } from '@vueuse/core';
import { dom, QSlider } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SeekControl',

  components: {
    TooltipControl: defineAsyncComponent(() => import('components/player/controls/TooltipControl.vue')),
  },

  setup() {
    const { player, state } = usePlayer();
    const slider = ref<QSlider>();
    const seeker = ref<number>();

    const buffered = computed(() => Math.round(state.buffered || 0));
    const seekerOffset = computed(() => dom.offset(<Element>slider.value?.$el).left);
    const seekerWidth = computed(() => dom.width(<Element>slider.value?.$el));

    const onMouseHover = (event: MouseEvent) => set(seeker, event.clientX);
    const onMouseLeave = () => set(seeker, undefined);

    const setCurrentTime = (payload: number | null) => player.value?.seek(payload || 0);

    return {
      onMouseHover,
      onMouseLeave,
      setCurrentTime,
      buffered,
      seeker,
      seekerOffset,
      seekerWidth,
      slider,
      state,
    };
  },
});
</script>
