<template>
  <q-card
    class="transparent tag-item"
    draggable="false"
    flat
    square
  >
    {{ tag }}
  </q-card>
</template>

<script lang="ts">
import { Tag } from 'src/interfaces/tag'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TagsItem',

  props: {
    tag: {
      type: Object as PropType<Tag>,
      required: true
    }
  },

  setup () {
    return {
      //
    }
  }
})
</script>
