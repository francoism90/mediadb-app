<template>
  <q-slider
    ref="seeker"
    class="player-video-seeker"
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
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'SeekControl',

  setup() {
    const { store } = usePlayer();
    const seeker = ref<QSlider>();

    const buffered = computed(() => Math.round(store.properties?.buffered || 0));
    const seekerWidth = computed(() => dom.width(<Element>seeker.value?.$el));
    const seekerOffset = computed(() => dom.offset(<Element>seeker.value?.$el));

    const onMouseHover = (event: MouseEvent) => store.$patch({
      tooltip: {
        position: event.clientX,
        offset: seekerOffset.value,
        width: seekerWidth.value,
      },
    });

    const onMouseLeave = () => store.$patch({
      tooltip: {
        position: 0,
        offset: seekerOffset.value,
        width: seekerWidth.value,
      },
    });

    const setCurrentTime = (payload: number) => { store.seek = payload; };

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
