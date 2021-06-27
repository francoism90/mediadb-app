<template>
  <div
    class="player-tooltip desktop-only"
  >
    {{ tooltip }}
  </div>
</template>

<script lang="ts">
import { PlayerTooltip } from 'src/interfaces/player';
import {
  defineComponent, PropType,
} from 'vue';

export default defineComponent({
  name: 'TooltipControl',

  props: {
    tooltip: {
      type: Object as PropType<PlayerTooltip>,
      required: true,
    },
  },

  setup(props) {
    console.log(props.tooltip);

    return {
      // sliderWidth,
    };
  },
});
</script>
