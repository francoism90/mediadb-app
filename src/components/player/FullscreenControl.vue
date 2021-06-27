<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    @click="toggleFullscreen"
  />
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import usePlayer from 'src/composables/usePlayer';
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'FullscreenControl',

  setup() {
    const $q = useQuasar();
    const { store } = usePlayer();

    const isFullscreen = ref<boolean>(false);

    const icon = computed(() => (isFullscreen.value === true ? 'fullscreen_exit' : 'fullscreen'));

    const toggleFullscreen = (): void => {
      store.dispatch({ fullscreen: !store.properties.fullscreen });
    };

    watch(() => $q.fullscreen.isActive, (val: boolean) => { isFullscreen.value = val; });

    return {
      store,
      icon,
      toggleFullscreen,
    };
  },
});
</script>
