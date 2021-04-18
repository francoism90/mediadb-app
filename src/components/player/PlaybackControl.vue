<template>
  <div
    class="absolute-center"
  >
    {{ request.pause }}
    <q-icon
      name="play_arrow"
      size="96px"
      color="white"
      @click="setRequest({ pause: !request.pause })"
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
    // const pause = ref(false)

    const { request, stream, setRequest } = usePlayer({ module: props.module })

    return {
      request,
      stream,
      setRequest
    }
  }
})
</script>
