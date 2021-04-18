<template>
  <div
    class="absolute-center"
  >
    <q-icon
      :name="icon"
      size="96px"
      color="white"
      @click="sendRequest({ pause: !request.pause })"
    />
  </div>
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

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

    const icon = computed(() => stream.value?.paused === true ? 'play_arrow' : 'pause')

    return {
      request,
      stream,
      sendRequest,
      icon
    }
  }
})
</script>
