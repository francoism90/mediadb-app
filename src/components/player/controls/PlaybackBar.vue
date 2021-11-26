<template>
  <div class="player-navigation absolute-center">
    <div class="row no-wrap justify-between items-center content-center q-col-gutter-lg">
      <q-icon
        name="replay_10"
        class="cursor-pointer"
        size="36px"
        tabindex="0"
        @click="decreaseTime"
      />

      <q-icon
        :name="icon"
        class="cursor-pointer"
        size="72px"
        tabindex="0"
        @click="togglePlayback"
      />

      <q-icon
        name="forward_10"
        class="cursor-pointer"
        size="36px"
        tabindex="0"
        @click="increaseTime"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaybackControl',

  setup() {
    const { store } = usePlayer();

    const icon = computed(() => (store.properties?.paused ? 'play_arrow' : 'pause'));

    const togglePlayback = () => store.dispatch({ pause: +new Date() });

    const decreaseTime = () => {
      const time = (store.properties?.time || 0) - 10;
      store.dispatch({ seek: +time.toFixed(2) });
    };

    const increaseTime = () => {
      const time = (store.properties?.time || 0) + 10;
      store.dispatch({ seek: +time.toFixed(2) });
    };

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
