<template>
  <q-slider
    ref="seeker"
    class="player-seeker"
    :model-value="store.properties?.time || 0"
    :min="0.0"
    :max="store.properties?.duration || 0"
    :step="0"
    :style="{ '--buffer': `${buffered}%` }"
    color="primary"
    tabindex="0"
    @mousemove="onMouseHover"
    @mouseleave="onMouseLeave"
    @update:model-value="setCurrentTime"
  />
</template>

<script lang="ts">
import { dom, QSlider } from 'quasar';
import usePlayer from 'src/composables/usePlayer';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SeekControl',

  setup() {
    const { store } = usePlayer();
    const seeker = ref<QSlider>();

    const buffered = computed(() => Math.round(store.properties?.buffered || 0));
    const seekerWidth = computed(() => dom.width(<Element>seeker.value?.$el));
    const seekerOffset = computed(() => dom.offset(<Element>seeker.value?.$el));

    const setCurrentTime = (payload: number): void => store.$patch({
      time: +payload.toFixed(2),
    });

    const onMouseHover = (event: MouseEvent): void => store.$patch({
      thumbnail: {
        seekerPosition: event.clientX,
        seekerOffset: seekerOffset.value,
        seekerWidth: seekerWidth.value,
      },
    });

    const onMouseLeave = (): void => store.$patch({ thumbnail: undefined });

    return {
      onMouseHover,
      onMouseLeave,
      setCurrentTime,
      buffered,
      seeker,
      store,
    };
  },
});
</script>
