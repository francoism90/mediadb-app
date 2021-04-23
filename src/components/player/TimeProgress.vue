<template>
  <div class="text-caption text-white">
    {{ currentTime }} / {{ duration }}
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters'
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TimeProgress',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { properties } = usePlayer({ module: props.module })
    const { formatTime } = useFilters()

    const currentTime = computed(() => formatTime(properties.value?.currentTime))
    const duration = computed(() => formatTime(properties.value?.duration))

    return {
      currentTime,
      duration
    }
  }
})
</script>
