<template>
  <q-page class="row items-center justify-evenly">
    {{ video }}
  </q-page>
</template>

<script lang="ts">
import { defineComponent, toRefs } from 'vue'
import useVideo from 'src/composables/useVideo'
// import Item from 'src/components/videos/Item.vue'

export default defineComponent({
  name: 'VideoPage',

  // components: {
  //   Item
  // },

  props: {
    id: { type: String, required: true },
    slug: { type: String, required: false }
  },

  setup (props) {
    const { id } = toRefs(props)
    const { video } = useVideo({ id })

    return {
      video
    }
  }
})
</script>
