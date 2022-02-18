<template>
  <div class="player-video-control absolute-center">
    <div class="row no-wrap items-center content-center q-col-gutter-lg">
      <q-icon
        name="replay_10"
        class="cursor-pointer"
        size="36px"
        tabindex="0"
        @click="decreaseTime"
      />

      <q-icon
        :name="playing"
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

    const playing = computed(() => (store.properties?.paused ? 'play_arrow' : 'pause'));

    const togglePlayback = () => { store.playback = !store.playback; };
    const decreaseTime = () => { store.seek = store.properties.time - 10; };
    const increaseTime = () => { store.seek = store.properties.time + 10; };

    return {
      playing,
      store,
      togglePlayback,
      decreaseTime,
      increaseTime,
    };
  },
});
</script>
