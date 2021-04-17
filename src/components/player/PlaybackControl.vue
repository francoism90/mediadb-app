<template>
  <div class="absolute-center">
    {{ stream.duration || 0 }}
    {{ stream || 0 }}
  </div>
</template>

<script lang="ts">
import usePlayerState from 'src/composables/usePlayerControl'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'PlaybackControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { stream } = usePlayerState(props.module)

    return {
      stream
    }
  }
})
</script>
