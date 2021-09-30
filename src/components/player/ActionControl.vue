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
import CaptionControl from 'src/components/player/CaptionControl.vue';
import ModelControl from 'src/components/player/ModelControl.vue';
import QualityControl from 'src/components/player/QualityControl.vue';
import { defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'ActionControl',

  components: {
    CaptionControl,
    ModelControl,
    QualityControl,
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
