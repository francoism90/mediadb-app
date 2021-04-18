<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-bottom"
  >
    <q-slider
      :model-value="stream.currentTime || 0"
      :min="0.0"
      :max="stream.duration || 0"
      :step="0"
      color="primary"
      @change="setCurrentTime"
    />
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
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
    const { request, stream, sendRequest } = usePlayer({ module: props.module })

    const setCurrentTime = (value: number | null) => {
      sendRequest({ currentTime: value || 0 })
    }

    return {
      request,
      stream,
      sendRequest,
      setCurrentTime
    }
  }
})
</script>
