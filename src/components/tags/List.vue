<template>
  <span
    v-for="(tag, index) in tags"
    :key="index"
  >
    <span v-if="index != 0">, </span>
    <span>{{ tag.name }}</span>
  </span>
</template>

<script lang="ts">
import { Tag } from 'src/interfaces/tag'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'TagList',

  props: {
    tags: {
      type: Array as PropType<Tag[]>,
      required: false,
      default: () => (<Tag[]>[])
    }
  }
})
</script>
