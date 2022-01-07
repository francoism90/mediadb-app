<template>
  <div
    class="absolute-full"
  >
    <transition
      appear
      enter-active-class="animated fadeIn"
      leave-active-class="animated fadeOut"
    >
      <div
        v-show="true"
        class="player-video-controls absolute-full all-pointer-events"
      >
        <playback-bar />
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoControls',

  components: {
    PlaybackBar: defineAsyncComponent(() => import('components/player/controls/PlaybackBar.vue')),
  },

  setup() {
    const { store } = usePlayer();

    return {
      store,
    };
  },
});
</script>
