<template>
  <q-icon
    right
    color="white"
    class="cursor-pointer"
    name="more_vert"
    aria-label="More Actions"
    size="24px"
  >
    <q-menu
      anchor="top right"
      class="menu"
      self="top right"
      square
      transition-duration="0"
      style="width: 250px; max-width: 100vw;"
      @hide="setComponent('ModelControl')"
    >
      <component
        :is="currentComponent"
        @set-component="setComponent"
      />
    </q-menu>
  </q-icon>
</template>

<script lang="ts">
import { defineAsyncComponent, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActionControl',

  components: {
    CaptionControl: defineAsyncComponent(() => import('components/player/CaptionControl.vue')),
    ModelControl: defineAsyncComponent(() => import('components/player/ModelControl.vue')),
    QualityControl: defineAsyncComponent(() => import('components/player/QualityControl.vue')),
  },

  setup() {
    const currentComponent = ref<string>('ModelControl');

    const setComponent = (value: string): void => {
      currentComponent.value = value;
    };

    return {
      setComponent,
      currentComponent,
    };
  },
});
</script>
