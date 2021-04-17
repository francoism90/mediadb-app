<template>
  <div
    class="absolute-center"
  >
    {{ pause }}
    <q-icon
      name="play_arrow"
      size="96px"
      color="white"
      @click="setPause(!pause)"
    />
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
import usePlayerState from 'src/composables/usePlayerState'
import { defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'PlaybackControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    // const pause = ref(false)

    const { setPause } = usePlayer({ module: props.module })
    const { pause, stream } = usePlayerState(props.module)

    return {
      pause,
      stream,
      setPause
    }
  }
})
</script>
