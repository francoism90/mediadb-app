<template>
  <div class="player-scrubber absolute-bottom">
    <tooltip
      v-if="spriteCue"
      :sprite-cue="spriteCue"
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
      @mousemove="onScrubberHover"
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
import Tooltip from 'src/components/player/Tooltip.vue'
import useFilters from 'src/composables/useFilters'
import usePlayer from 'src/composables/usePlayer'
import { SpriteTrackCue } from 'src/interfaces/player'
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'ScrubberControl',

  components: {
    TimeProgress,
    Tooltip,
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
    const spriteCue = ref<SpriteTrackCue | null>(null)

    const { isLoading, properties, setProperties } = usePlayer({ module: props.module })
    const { formatTime } = useFilters()

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
      const position = spriteCue.value?.position || 160
      const finalPosition = clamp(position - 80, 0, sliderWidth - 160)

      return { marginLeft: `${finalPosition}px` }
    })

    const onScrubberHover = (event: MouseEvent) => {
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

      spriteCue.value = {
        time: formatTime(clientTime),
        position: clientPosition,
        text: vttCue?.text
      }
    }

    const setCurrentTime = (value: number) => {
      const time = Math.floor(value)
      setProperties({ currentTime: time, requestTime: time })
    }

    return {
      slider,
      spriteCue,
      properties,
      isLoading,
      bufferedPct,
      bufferedRemainingPct,
      bufferStyle,
      tooltipStyle,
      onScrubberHover,
      setCurrentTime
    }
  }
})
</script>
