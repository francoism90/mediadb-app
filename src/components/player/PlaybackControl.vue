<template>
  <div
    ref="domRef"
    class="absolute-center"
  >
    <div class="q-gutter-md row no-wrap justify-center items-center content-center">
      <q-icon
        name="replay_10"
        class="cursor-pointer"
        size="48px"
        color="white"
        @click="onSeekBackward"
      />

      <q-icon
        :name="icon"
        size="96px"
        color="white"
        @click="onToggleClick"
      />

      <q-icon
        name="forward_10"
        class="cursor-pointer"
        size="48px"
        color="white"
        @click="onSeekForward"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { usePlayer, usePlayerContext } from '@vime/vue-next'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType, ref, watch } from 'vue'

export default defineComponent({
  name: 'PlaybackControl',

  components: {

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

    const currentTime = usePlayerContext(domRef, 'currentTime', 0)
    const duration = usePlayerContext(domRef, 'duration', -1)

    return {
      domRef,
      player,
      paused,
      currentTime,
      duration,
      icon
    }
  },

  methods: {
    onToggleClick () {
      this.paused = !this.paused
    },

    onSeekBackward () {
      console.log(this.currentTime)
      if (this.currentTime < 10) return
      this.currentTime -= 10
    },

    onSeekForward () {
      console.log(this.currentTime)
      console.log(this.duration)
      if (this.currentTime > (this.duration - 10)) return
      this.currentTime += 10
    }
  }
})
</script>
