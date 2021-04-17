<template>
  <div ref="domRef">
    <control
      class="absolute-center"
      keys="k"
      label="Play/pause"
      :pressed="paused"
      @click="onClick"
    >
      <q-icon
        :name="icon"
        size="96px"
        color="white"
      />
    </control>
  </div>
</template>

<script lang="ts">
import { Control, usePlayer, usePlayerContext } from '@vime/vue-next'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType, ref } from 'vue'

export default defineComponent({
  name: 'PlaybackControl',

  components: {
    Control
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup () {
    const domRef = ref<HTMLDivElement | null>(null)
    const player = usePlayer(domRef)

    const paused = usePlayerContext(domRef, 'paused', true)
    const icon = computed(() => paused.value ? 'play_arrow' : 'pause')

    const onClick = () => {
      paused.value = !paused.value
    }

    return {
      domRef,
      player,
      paused,
      onClick,
      icon
    }
  }
})
</script>
