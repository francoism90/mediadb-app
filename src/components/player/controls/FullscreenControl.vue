<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
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
    const { store } = usePlayer();

    const icon = computed(() => (store.properties?.fullscreen ? 'fullscreen_exit' : 'fullscreen'));

    const onClick = () => store.dispatch('ToggleFullscreen');

    return {
      icon,
      onClick,
    };
  },
});
</script>
