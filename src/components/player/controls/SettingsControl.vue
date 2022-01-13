<template>
  <q-icon
    name="settings"
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
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'SettingsControl',

  setup() {
    const { store } = usePlayer();

    const onClick = () => { store.fullscreen = !store.fullscreen; };

    return {
      onClick,
    };
  },
});
</script>
