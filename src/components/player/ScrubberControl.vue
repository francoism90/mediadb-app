<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-bottom player-control player-scrubber"
  >
    <div class="row no-wrap justify-between items-center content-center">
      <div class="col">
        <time-progress :module="module" />
      </div>

      <div class="col-auto">
        <div class="q-col-gutter-sm">
          <caption-control :module="module" />
          <fullscreen-control :module="module" />
        </div>
      </div>
    </div>

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
import CaptionControl from 'src/components/player/CaptionControl.vue'
import FullscreenControl from 'src/components/player/FullscreenControl.vue'
import TimeProgress from 'src/components/player/TimeProgress.vue'
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ScrubberControl',

  components: {
    TimeProgress,
    FullscreenControl,
    CaptionControl
  },

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

      if (buffered.length === 0) {
        return 0
      }

      const bufferedSeconds = buffered.end(0) - buffered.start(0)

      return Math.round((bufferedSeconds / duration) * 100)
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
