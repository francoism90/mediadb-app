<template>
  <router-view />
</template>

<script lang="ts">
import { useMeta, useQuasar } from 'quasar';
import { useDevice } from 'src/composables/useDevice';
import { defineComponent, watch } from 'vue';

const metaData = {
  title: '',
  titleTemplate: (title: string) => `${title} | MediaDB`,
};

export default defineComponent({
  name: 'App',

  setup() {
    const $q = useQuasar();
    const meta = useMeta(metaData);
    const { isUsable, onEnterFullScreen, onLeaveFullScreen } = useDevice();

    watch(() => $q.fullscreen.isActive, async (value) => {
      if (isUsable() && value === true) await onEnterFullScreen();
      if (isUsable() && value === false) await onLeaveFullScreen();
    });

    return {
      meta,
    };
  },
});
</script>
