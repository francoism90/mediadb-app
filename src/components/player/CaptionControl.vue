<template>
  <q-icon
    name="closed_caption_off"
    color="white"
    class="cursor-pointer"
    size="24px"
  />
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'CaptionControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup() {
    //
  },
});
</script>
