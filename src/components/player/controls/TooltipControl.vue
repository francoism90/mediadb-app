<template>
  <div
    v-if="percent > 0"
    class="player-video-control player-video-thumbnail desktop-only relative-position q-my-md"
    :style="{ marginLeft: `${margin}px` }"
  >
    <q-img
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
import { clamp, debounce } from 'lodash';
import { usePlayer } from 'src/composables/usePlayer';
import { timeFormat } from 'src/helpers';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  setup() {
    const { thumbnail, store } = usePlayer();

    const uri = ref<string>();

    const width = computed(() => store.tooltip?.width || 0);
    const offset = computed(() => store.tooltip?.offset?.left || 0);
    const position = computed(() => (store.tooltip?.position || 0) - offset.value);

    const margin = computed(() => clamp(position.value - 120, 0, width.value - 240));
    const percent = computed(() => clamp((position.value / width.value) * 100, 0, 100));
    const time = computed(() => (store.properties?.duration || 0) * (percent.value / 100));
    const timestamp = computed(() => timeFormat(time.value || 0));

    const render = async (): Promise<void> => {
      const response = await thumbnail(time.value);
      const reader = new window.FileReader();

      reader.readAsDataURL(response);
      reader.onload = () => {
        uri.value = reader.result?.toString() || '';
      };
    };

    watch(percent, debounce(render, 25));

    return {
      store,
      margin,
      percent,
      timestamp,
      uri,
    };
  },
});
</script>
