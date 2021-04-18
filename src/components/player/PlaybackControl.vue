<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-center q-gutter-xs"
  >
    <q-icon
      name="replay_10"
      class="cursor-pointer"
      color="white"
      size="36px"
      @click="decreaseTime"
    />

    <q-icon
      :name="icon"
      class="cursor-pointer"
      color="white"
      size="96px"
      @click="sendRequest({ pause: !request.pause })"
    />

    <q-icon
      name="forward_10"
      class="cursor-pointer"
      color="white"
      size="36px"
      @click="increaseTime"
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

    const decreaseTime = () => {
      const currentTime = stream.value?.currentTime || 10

      sendRequest({ currentTime: currentTime - 10 })
    }

    const increaseTime = () => {
      const currentTime = stream.value?.currentTime || 0

      sendRequest({ currentTime: currentTime + 10 })
    }

    return {
      request,
      stream,
      sendRequest,
      decreaseTime,
      increaseTime,
      icon
    }
  }
})
</script>
