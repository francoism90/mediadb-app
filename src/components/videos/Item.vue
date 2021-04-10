<template>
  <div>
    Item
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import { Video } from 'src/interfaces/video'

export default defineComponent({
  name: 'VideoItem',

  // components: {
  // NavigationLink,
  // GlobalSearch
  // },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: false
    }
  },

  setup (props) {
    console.log(props.video)
    console.log('setup')
    return {
    }
  }
})
</script>
