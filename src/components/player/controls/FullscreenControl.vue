<template>
  <div class="player-video-control">
    <q-icon
      :name="icon"
      class="cursor-pointer"
      size="24px"
      right
      tabindex="0"
      @click="onClick"
    />
  </div>
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
      onClick,
      icon,
    };
  },
});
</script>
