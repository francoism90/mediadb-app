<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-bottom player-settings"
  >
    <div class="row no-wrap justify-between items-center content-center">
      <div class="col">
        <div class="text-overline text-white">
          {{ currentTime }} / {{ duration }}
        </div>
      </div>

      <div class="col-auto">
        {{ duration }}
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters'
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'SettingsControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { request, stream, sendRequest } = usePlayer({ module: props.module })

    const { formatTimestamp } = useFilters()

    const currentTime = computed(() => formatTimestamp(stream.value?.currentTime || 0))
    const duration = computed(() => formatTimestamp(stream.value?.duration || 0))

    return {
      request,
      stream,
      currentTime,
      duration,
      sendRequest
    }
  }
})
</script>
