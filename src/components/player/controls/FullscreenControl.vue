<template>
  <q-icon
    :name="icon"
    class="player-video-control cursor-pointer"
    size="24px"
    right
    tabindex="0"
    @click="onClick"
  />
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'FullscreenControl',

  setup() {
    const { state } = usePlayer();

    const icon = computed(() => (state.fullscreen ? 'fullscreen_exit' : 'fullscreen'));

    const onClick = () => { state.fullscreen = !state.fullscreen; };

    return {
      icon,
      onClick,
    };
  },
});
</script>
