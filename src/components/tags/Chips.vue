<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(tag, index) in tags"
      :key="index"
      :label="tag.name"
      square
      dark
    />
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Tag } from 'src/interfaces/tag'

export default defineComponent({
  name: 'TagChips',

  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: false,
      default: () => (<Tag[]>[])
    }
  },

  setup (props) {
    console.log(props)
    // const { formatTimestamp } = useFilters()

    // const timestamp = computed(() => formatTimestamp(props.video?.duration || 0))

    // return {
    //   timestamp
    // }
  }
})
</script>
