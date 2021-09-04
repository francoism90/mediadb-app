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
import useDash from 'src/composables/useDash';
import {
  computed, defineComponent, ref, watch,
} from 'vue';

export default defineComponent({
  name: 'FullscreenControl',

  setup() {
    const $q = useQuasar();
    const { store } = useDash();

    const isFullscreen = ref<boolean>(false);
    const icon = computed(() => (isFullscreen.value ? 'fullscreen_exit' : 'fullscreen'));

    const toggleFullscreen = (): void => {
      store.fullscreen = !store.fullscreen;
    };

    watch(() => $q.fullscreen.isActive, (value: boolean) => { isFullscreen.value = value; });

    return {
      store,
      icon,
      toggleFullscreen,
    };
  },
});
</script>
