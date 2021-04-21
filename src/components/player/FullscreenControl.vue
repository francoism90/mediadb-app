<template>
  <q-icon
    :name="request.fullscreen ? 'fullscreen_exit' : 'fullscreen'"
    color="white"
    class="cursor-pointer"
    size="32px"
    @click="sendRequest({ fullscreen: !request.fullscreen })"
  />
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FullscreenControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { request, sendRequest } = usePlayer({ module: props.module })

    return {
      request,
      sendRequest
    }
  }
})
</script>
