<template>
  <div>
    Sorter
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideosSorter',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup () {
    //
  }
})
</script>
