<template>
  <div class="absolute-center player-control">
    <div class="row no-wrap justify-between items-center content-center q-col-gutter-lg">
      <template v-if="isLoading">
        <q-spinner-dots
          color="white"
          size="64px"
        />
      </template>

      <template v-else>
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
          size="72px"
          @click="setPause"
        />

        <q-icon
          name="forward_10"
          class="cursor-pointer"
          color="white"
          size="36px"
          @click="increaseTime"
        />
      </template>
    </div>
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
    const { isLoading, properties, setProperties } = usePlayer({ module: props.module })

    const icon = computed(() => properties.value?.paused === true ? 'play_arrow' : 'pause')

    const decreaseTime = () => {
      setProperties({ currentTime: properties.value?.currentTime - 10 })
    }

    const increaseTime = () => {
      setProperties({ currentTime: properties.value?.currentTime + 10 })
    }

    const setPause = () => {
      setProperties({ paused: !properties.value?.paused })
    }

    return {
      properties,
      isLoading,
      decreaseTime,
      increaseTime,
      setPause,
      icon
    }
  }
})
</script>
