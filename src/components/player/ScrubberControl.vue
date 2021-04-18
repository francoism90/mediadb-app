<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-bottom player-seeker"
  >
    <q-slider
      :model-value="stream.currentTime || 0"
      :min="0.0"
      :max="stream.duration || 0"
      :step="0"
      :style="bufferStyle"
      color="primary"
      @change="setCurrentTime"
    />
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ScrubberControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { request, stream, sendRequest } = usePlayer({ module: props.module })

    const bufferedPct = computed(() => {
      const buffered = stream.value?.buffered || <TimeRanges>{}
      const duration = stream.value?.duration || 0

      const r = buffered
      r.start(0)

      const end = r.end(0)

      return Math.round((end / duration) * 100)
    })

    const bufferedRemainingPct = computed(() => {
      return Math.round(100 - bufferedPct.value)
    })

    const bufferStyle = computed(() => {
      return {
        '--buffer': `${bufferedPct.value}%`,
        '--remaining': `${bufferedRemainingPct.value}%`
      }
    })

    const setCurrentTime = (value: number | null) => {
      sendRequest({ currentTime: value || 0 })
    }

    return {
      request,
      stream,
      bufferedPct,
      bufferedRemainingPct,
      bufferStyle,
      sendRequest,
      setCurrentTime
    }
  }
})
</script>
