<template>
  <q-icon
    :name="icon"
    color="white"
    class="cursor-pointer"
    size="24px"
    @click="setFullscreen"
  />
</template>

<script lang="ts">
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'FullscreenControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { properties, setProperties } = usePlayer({ module: props.module })

    const icon = computed(() => properties.value?.fullscreen === true ? 'fullscreen_exit' : 'fullscreen')

    const setFullscreen = () => {
      setProperties({ fullscreen: !properties.value?.fullscreen })
    }

    return {
      icon,
      properties,
      setFullscreen
    }
  }
})
</script>
