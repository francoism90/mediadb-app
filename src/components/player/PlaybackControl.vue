<template>
  <div class="absolute-center player-playback">
    <div class="row no-wrap justify-between items-center content-center q-col-gutter-lg">
      <template v-if="store.isLoading">
        <q-spinner-dots
          color="white"
          size="64px"
        />
      </template>

      <template v-else>
        <q-icon
          name="replay_10"
          class="cursor-pointer"
          color="white"
          size="36px"
          @click="decreaseTime"
        />

        <q-icon
          :name="icon"
          class="cursor-pointer"
          color="white"
          size="72px"
          @click="togglePlayback"
        />

        <q-icon
          name="forward_10"
          class="cursor-pointer"
          color="white"
          size="36px"
          @click="increaseTime"
        />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaybackControl',

  setup() {
    const { store } = usePlayer();

    const icon = computed(() => (
      store.properties?.paused === true
        ? 'play_arrow'
        : 'pause'
    ));

    const decreaseTime = (): void => {
      const currentTime = store.properties?.currentTime || 0;
      store.dispatch({ time: currentTime - 10 });
    };

    const increaseTime = (): void => {
      const currentTime = store.properties?.currentTime || 0;
      store.dispatch({ time: currentTime + 10 });
    };

    const togglePlayback = () => store.dispatch({
      playback: !store.properties?.paused || false,
    });

    return {
      decreaseTime,
      increaseTime,
      togglePlayback,
      store,
      icon,
    };
  },
});
</script>
