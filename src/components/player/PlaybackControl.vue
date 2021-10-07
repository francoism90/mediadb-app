<template>
  <div class="q-gutter-x-sm">
    <q-icon
      :name="icon"
      class="cursor-pointer"
      size="24px"
      @click="togglePlayback"
    />

    <q-icon
      name="replay_10"
      class="cursor-pointer"
      size="24px"
      @click="decreaseTime"
    />

    <q-icon
      name="forward_10"
      class="cursor-pointer"
      size="24px"
      @click="increaseTime"
    />
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaybackControl',

  setup() {
    const { store } = usePlayer();

    const togglePlayback = (): void => { store.pause = !store.pause; };

    const decreaseTime = (): void => {
      const time = store.properties?.time || 0;
      store.time = time - 10;
    };
    const increaseTime = (): void => {
      const time = store.properties?.time || 0;
      store.time = time + 10;
    };

    const icon = computed(() => (store.properties?.paused ? 'play_arrow' : 'pause'));

    return {
      togglePlayback,
      decreaseTime,
      increaseTime,
      icon,
      store,
    };
  },
});
</script>
