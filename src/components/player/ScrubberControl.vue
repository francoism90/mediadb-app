<template>
  <div class="player-scrubber absolute-bottom">
    <scrubber-tooltip
      v-if="tooltip && tooltip.time"
      :data="tooltip"
      :style="tooltipStyle"
    />

    <q-slider
      ref="slider"
      :disable="properties.readyState === 0"
      :model-value="properties.currentTime"
      :min="0.0"
      :max="properties.duration"
      :step="0"
      :style="bufferStyle"
      color="primary"
      @mousemove="activateTooltip"
      @mouseleave="deactivateTooltip"
      @change="setCurrentTime"
    />

    <div class="row no-wrap justify-between items-center content-center">
      <div class="col">
        <time-progress :module="module" />
      </div>

      <div class="col-auto">
        <div class="q-col-gutter-sm">
          <fullscreen-control :module="module" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { clamp, find } from 'lodash'
import { dom, QSlider } from 'quasar'
import FullscreenControl from 'src/components/player/FullscreenControl.vue'
import TimeProgress from 'src/components/player/TimeProgress.vue'
import ScrubberTooltip from 'src/components/player/ScrubberTooltip.vue'
import usePlayer from 'src/composables/usePlayer'
import { PlayerTooltip } from 'src/interfaces/player'
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ScrubberControl',

  components: {
    TimeProgress,
    ScrubberTooltip,
    FullscreenControl
  },

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const slider = ref<QSlider | null>(null)
    const tooltip = ref<PlayerTooltip | null>(null)

    const { properties, setProperties } = usePlayer({ module: props.module })

    const buffered = computed(() => properties.value?.buffered || <TimeRanges>{})
    const duration = computed(() => properties.value?.duration || 0)
    const textTracks = computed(() => properties.value.textTracks || <TextTrackList>{})

    const bufferedPct = computed(() => {
      if (!(buffered.value instanceof TimeRanges) || buffered.value.length === 0) {
        return 0
      }

      const bufferedSeconds = buffered.value.end(0) - buffered.value.start(0)

      return Math.round((bufferedSeconds / duration.value) * 100)
    })

    const bufferedRemainingPct = computed(() => Math.round(100 - bufferedPct.value))

    const bufferStyle = computed(() => {
      return {
        '--buffer': `${bufferedPct.value}%`,
        '--remaining': `${bufferedRemainingPct.value}%`
      }
    })

    const tooltipStyle = computed(() => {
      const sliderWidth = dom.width(slider.value?.$el)
      const position = tooltip.value?.position || 160
      const finalPosition = clamp(position - 80, 0, sliderWidth - 160)

      return { marginLeft: `${finalPosition}px` }
    })

    const activateTooltip = (event: MouseEvent): void => {
      const sliderWidth = dom.width(slider.value?.$el)
      const sliderOffset = dom.offset(slider.value?.$el)
      const clientPosition = event.clientX - sliderOffset?.left
      const clientPercent = Math.round((clientPosition) / sliderWidth * 100)
      const clientTime = Math.floor(duration.value * (clientPercent / 100))

      const track = find(textTracks.value, { id: 'sprite' }) as TextTrack | null
      const cues = track?.cues as TextTrackCueList || undefined

      const vttCue = find(cues, (o) => {
        return o.startTime >= clientTime || o.startTime >= (clientTime - 30) || o.id
      }) as VTTCue

      tooltip.value = {
        cue: vttCue,
        position: clientPosition,
        time: clientTime,
      }
    }

    const deactivateTooltip = (): void => {
      tooltip.value = null
    }

    const setCurrentTime = (value: number) => {
      setProperties({ requestTime: value })
    }

    return {
      slider,
      tooltip,
      properties,
      bufferedPct,
      bufferedRemainingPct,
      bufferStyle,
      tooltipStyle,
      activateTooltip,
      deactivateTooltip,
      setCurrentTime
    }
  }
})
</script>
