<template>
  <q-icon
    right
    color="white"
    class="cursor-pointer"
    name="more_vert"
    aria-label="More Actions"
    size="24px"
    tabindex="0"
  >
    <q-menu
      anchor="top right"
      class="menu"
      self="top right"
      square
      transition-duration="0"
      style="width: 250px; max-width: 100vw;"
      @show="onShow"
      @hide="onHide"
    >
      <component
        :is="currentComponent"
        @set-component="setComponent"
      />
    </q-menu>
  </q-icon>
</template>

<script lang="ts">
import { usePlayer } from 'src/composables/usePlayer';
import { defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActionControl',

  components: {
    CaptionControl: defineAsyncComponent(() => import('components/player/controls/CaptionControl.vue')),
    ModelControl: defineAsyncComponent(() => import('components/player/controls/ModelControl.vue')),
    QualityControl: defineAsyncComponent(() => import('components/player/controls/QualityControl.vue')),
  },

  setup() {
    const { store } = usePlayer();

    const currentComponent = ref<string>('ModelControl');

    const setComponent = (value: string): void => {
      currentComponent.value = value;
    };

    const onShow = (): void => {
      store.activity = true;
    };

    const onHide = (): void => {
      setComponent('ModelControl');
      store.activity = false;
    };

    return {
      onShow,
      onHide,
      setComponent,
      currentComponent,
    };
  },
});
</script>
