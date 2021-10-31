<template>
  <q-img
    v-if="store.tooltip?.position > 0"
    :src="thumbnail"
    :draggable="false"
    :style="{ marginLeft: `${margin}px` }"
    class="player-thumbnail desktop-only q-my-md rounded-borders no-transition"
    fit="fill"
    no-spinner
    no-transition
  >
    <div class="absolute-bottom text-caption text-white text-center">
      {{ timestamp }}
    </div>
  </q-img>
</template>

<script lang="ts">
import { clamp, debounce } from 'lodash';
import { usePlayer } from 'src/composables/usePlayer';
import { timeFormat } from 'src/helpers';
import { computed, defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  setup() {
    const { getThumbnail, store } = usePlayer();

    const thumbnail = ref<string>();

    const width = computed(() => store.tooltip?.width || 0);
    const offset = computed(() => store.tooltip?.offset?.left || 0);
    const position = computed(() => store.tooltip?.position - offset.value);

    const margin = computed(() => clamp(position.value - 120, 0, width.value - 240));
    const percent = computed(() => clamp((position.value / width.value) * 100, 0, 100));
    const time = computed(() => (store.properties?.duration || 0) * (percent.value / 100));
    const timestamp = computed(() => timeFormat(time.value || 0));

    const render = async (): Promise<void> => {
      const response = await getThumbnail(time.value);

      const reader = new window.FileReader();

      reader.readAsDataURL(response);

      reader.onload = () => {
        thumbnail.value = reader.result?.toString() || '';
      };
    };

    watch(percent, debounce(render, 25));

    return {
      store,
      margin,
      percent,
      thumbnail,
      timestamp,
    };
  },
});
</script>
