<template>
  <div class="absolute-center player-play">
    <div class="row no-wrap justify-between items-center content-center q-col-gutter-lg">
      <template v-if="!store.isReady">
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

    const icon = computed(() => (store.properties.paused === true ? 'play_arrow' : 'pause'));

    const decreaseTime = () => {
      store.requestTime = store.properties.currentTime || 0 - 10;
    };

    const increaseTime = () => {
      store.requestTime = store.properties.currentTime || 0 + 10;
    };

    const togglePlayback = () => {
      store.properties.paused = !store.properties.paused;
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
