<template>
  <div
    class="player-video-control player-video-thumbnail desktop-only relative-position q-my-md"
    :style="{ marginLeft: `${margin}px` }"
  >
    <q-img
      v-if="uri"
      :src="uri"
      :draggable="false"
      fit="fill"
      no-spinner
      no-transition
    />

    <div class="absolute-bottom q-ma-xs text-center">
      <span class="text-caption">{{ timestamp }}</span>
    </div>
  </div>
</template>

<script lang="ts">
import { set } from '@vueuse/core';
import { clamp, debounce } from 'lodash';
import { usePlayer } from 'src/composables/usePlayer';
import { timeFormat } from 'src/helpers';
import { getTrackCueBlob } from 'src/services/player';
import { computed, defineComponent, PropType, ref, watch } from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  props: {
    seekerPosition: {
      type: Number as PropType<number>,
      required: true,
    },

    seekerOffset: {
      type: Number as PropType<number>,
      required: true,
    },

    seekerWidth: {
      type: Number as PropType<number>,
      required: true,
    },
  },

  setup(props) {
    const { state, player } = usePlayer();

    const uri = ref<string>();

    const position = computed(() => props.seekerPosition - props.seekerOffset);
    const margin = computed(() => clamp(position.value - 120, 0, props.seekerWidth - 240));
    const percent = computed(() => clamp((position.value / props.seekerWidth) * 100, 0, 100));
    const time = computed(() => (state?.duration || 0) * (percent.value / 100));
    const timestamp = computed(() => timeFormat(time.value || 0));

    const render = async (): Promise<void> => {
      const { error, data } = await getTrackCueBlob(player.value, 'thumbnail', time.value);
      const reader = new window.FileReader();

      if (!error.value && data.value) {
        reader.readAsDataURL(data.value);
      }

      reader.onload = () => set(uri, reader.result?.toString() || '');
    };

    watch(percent, debounce(render, 25));

    return {
      margin,
      timestamp,
      uri,
    };
  },
});
</script>
