<template>
  <div class="container">
    <h1 class="text-h2 text-white ellipsis-2-lines">
      {{ video.name }}
    </h1>

    <div class="q-gutter-sm">
      <q-chip
        class="no-padding"
        color="transparent"
        icon="visibility"
        dense
        dark
      >
        <span class="q-ml-xs text-body1">{{ video.views || 0 }} views</span>
      </q-chip>
    </div>

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
