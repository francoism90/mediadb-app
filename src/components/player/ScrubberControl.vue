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

    {{ properties.textTracks }}

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
import { dom, QSlider } from 'quasar'
import CaptionControl from 'src/components/player/CaptionControl.vue'
import FullscreenControl from 'src/components/player/FullscreenControl.vue'
import TimeProgress from 'src/components/player/TimeProgress.vue'
// import useMediaThumbnail from 'src/composables/useMediaThumbnail'
import usePlayer from 'src/composables/usePlayer'
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
    const { isLoading, media, properties, setProperties } = usePlayer({ module: props.module })
    // const { fetchThumbnail, url: thumbnailUrl } = useMediaThumbnail(media.value)

    const slider = ref<QSlider | null>(null)

    console.log(properties.value.textTracks)

    const bufferedPct = computed(() => {
      const buffered = properties.value?.buffered || <TimeRanges>{}
      const duration = properties.value?.duration || 0

      if (!(buffered instanceof TimeRanges) || buffered.length === 0) {
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

    const onScrubberHover = (event: MouseEvent) => {
      setProperties({ controls: true })

      const sliderWidth = dom.width(slider.value?.$el)
      const sliderOffset = dom.offset(slider.value?.$el)

      const hoverPosition = event.clientX - sliderOffset.left
      const hoverPercent = Math.round((hoverPosition) / sliderWidth * 100)

      const foo = Math.round(hoverPercent / 2) * 2
      const frame = Math.round((media.value?.duration || 0) * foo)

      // console.log(hoverPercent)
      // console.log(media.value?.duration)
      console.log(foo)
      console.log(frame)
      // console.log(sliderOffset)
    }

    const setCurrentTime = (value: number) => {
      setProperties({
        currentTime: value,
        requestTime: value
      })
    }

    return {
      slider,
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
