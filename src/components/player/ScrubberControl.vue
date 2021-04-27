<template>
  <div class="absolute-bottom player-control player-scrubber">
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

    <q-img
      v-if="trackCue"
      :src="trackCue.thumbnail?.url"
      :alt="trackCue.time"
      width="160px"
      height="90px"
      no-spinner
      no-transition
    >
      <div class="absolute-bottom text-center">
        <div class="text-white player-thumb-label">
          {{ trackCue.time }}
        </div>
      </div>
    </q-img>

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
  </div>
</template>

<script lang="ts">
import { find } from 'lodash'
import { dom, QSlider } from 'quasar'
import CaptionControl from 'src/components/player/CaptionControl.vue'
import FullscreenControl from 'src/components/player/FullscreenControl.vue'
import TimeProgress from 'src/components/player/TimeProgress.vue'
import useFilters from 'src/composables/useFilters'
import usePlayer from 'src/composables/usePlayer'
import { TextTrackCue, TextTrackCueThumbnail } from 'src/interfaces/player'
import { computed, defineComponent, PropType, ref } from 'vue'

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
    const slider = ref<QSlider | null>(null)
    const trackCue = ref<TextTrackCue | null>(null)

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

    const onScrubberHover = (event: MouseEvent) => {
      const sliderWidth = dom.width(slider.value?.$el)
      const sliderOffset = dom.offset(slider.value?.$el)
      const hoverPosition = event.clientX - sliderOffset.left
      const hoverPercent = Math.round((hoverPosition) / sliderWidth * 100)
      const hoverTime = Math.floor(duration.value * (hoverPercent / 100))

      const track = find(textTracks.value, { id: 'sprite' }) as TextTrack | null
      const cues = track?.cues as TextTrackCueList || undefined

      const vttCue = find(cues, (o) => {
        return o.startTime >= hoverTime || o.startTime >= (hoverTime - 30) || o.id
      }) as VTTCue

      const thumbnail = JSON.parse(vttCue?.text) as TextTrackCueThumbnail

      trackCue.value = { time: formatTime(hoverTime), thumbnail: thumbnail }
    }

    const setCurrentTime = (value: number) => {
      const time = Math.floor(value)

      setProperties({ currentTime: time, requestTime: time })
    }

    return {
      slider,
      trackCue,
      properties,
      isLoading,
      bufferedPct,
      bufferedRemainingPct,
      bufferStyle,
      onScrubberHover,
      setCurrentTime
    }
  }
})
</script>
