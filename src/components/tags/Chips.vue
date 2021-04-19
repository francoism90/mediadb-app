<template>
  <div class="q-gutter-xs">
    <q-chip
      v-for="(tag, index) in tags"
      :key="index"
      :label="tag.name"
      clickable
      dense
      color="grey-10"
      text-color="grey-5"
      class="text-caption"
      size="0.875em"
      square
    />
  </div>
</template>

<script lang="ts">
import { Tag } from 'src/interfaces/tag'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TagChips',

  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: false,
      default: () => (<Tag[]>[])
    }
  },

  setup () {
    return {
      //
    }
  }
})
</script>
