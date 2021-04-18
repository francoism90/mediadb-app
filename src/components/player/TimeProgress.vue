<template>
  <div class="text-overline text-white">
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
    const { stream } = usePlayer({ module: props.module })
    const { formatTimestamp } = useFilters()

    const currentTime = computed(() => formatTimestamp(stream.value?.currentTime || 0))
    const duration = computed(() => formatTimestamp(stream.value?.duration || 0))

    return {
      stream,
      currentTime,
      duration
    }
  }
})
</script>
