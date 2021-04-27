<template>
  <div class="absolute-top-right player-settings">
    <div class="q-col-gutter-sm">
      <caption-control :module="module" />
      <model-control :module="module" />
    </div>
  </div>
</template>

<script lang="ts">
import CaptionControl from 'src/components/player/CaptionControl.vue'
import ModelControl from 'src/components/player/ModelControl.vue'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SettingsControl',

  components: {
    CaptionControl,
    ModelControl
  },

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  }
})
</script>
