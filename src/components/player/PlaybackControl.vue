<template>
  <div class="absolute-center player-playback">
    <div class="row no-wrap justify-between items-center content-center q-col-gutter-lg">
      {{ store.properties?.textTracks }}

      <template v-if="store.isWaiting">
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
import useDash from 'src/composables/useDash';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'PlaybackControl',

  setup() {
    const { store } = useDash();

    const icon = computed(() => (
      store.properties.paused
        ? 'play_arrow'
        : 'pause'
    ));

    const decreaseTime = (): void => {
      const time = store.properties.time || 0;
      store.requestTime = time - 10;
    };

    const increaseTime = (): void => {
      const time = store.properties.time || 0;
      store.requestTime = time + 10;
    };

    const togglePlayback = (): void => {
      store.requestPause = !store.requestPause;
    };

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
