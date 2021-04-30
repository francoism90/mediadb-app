<template>
  <div class="player-tooltip desktop-only">
    <q-img
      :src="thumbnail?.text || ''"
      width="160px"
      height="90px"
      no-spinner
      no-transition
      class="player-tooltip-thumbnail"
    />

    <div class="text-white text-center q-py-xs">
      {{ time }}
    </div>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters'
import { PlayerTooltip } from 'src/interfaces/player'
import { computed, defineComponent, onMounted, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'TooltipControl',

  props: {
    data: {
      type: Object as PropType<PlayerTooltip>,
      required: true
    }
  },

  setup (props) {
    const thumbnail = ref<VTTCue | null>(null)
    const thumbnailTimer = ref<number | undefined>(0)

    const { formatTime } = useFilters()

    const time = computed(() => formatTime(props.data?.time || 0))

    const setThumbnail = () => {
      thumbnail.value = null

      clearTimeout(thumbnailTimer.value)
      if (props.data.cue && props.data.cue.text) {
        thumbnailTimer.value = window.setTimeout(() => {
          thumbnail.value = props.data.cue
        }, 100)
      }
    }

    onMounted(() => setThumbnail)

    watch(() => props.data, value => {
      if (value.cue?.text !== thumbnail.value?.text) {
        setThumbnail()
      }
    })

    return {
      thumbnail,
      time
    }
  }
})
</script>
