<template>
  <q-page>
    <template v-if="!video">
      Loading ..
    </template>

    <template v-else>
      <player :video="video" />
    </template>
  </q-page>
</template>

<script lang="ts">
import Player from 'src/components/player/Video.vue'
import useVideo from 'src/composables/useVideo'
import { defineComponent, toRefs } from 'vue'

export interface Props {
  id: string,
  slug?: string | null
}

export default defineComponent({
  name: 'VideoPage',

  components: {
    Player
  },

  props: {
    id: {
      type: String,
      required: true
    },

    slug: {
      type: String,
      required: false,
      default: null
    }
  },

  setup (props: Props) {
    const { id } = toRefs(props)
    const { video } = useVideo({ id })

    return {
      video
    }
  }
})
</script>
