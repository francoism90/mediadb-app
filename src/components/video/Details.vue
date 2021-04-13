<template>
  <div class="container">
    <h1 class="text-h3 text-white">
      {{ video.name }}
    </h1>
    <p>{{ video.overview }}</p>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideoDetails',

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const { formatTimestamp } = useFilters()

    const timestamp = computed(() => formatTimestamp(props.video.clip?.duration || 0))

    return {
      timestamp
    }
  }
})
</script>
