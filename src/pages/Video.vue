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
import { defineComponent, toRefs } from 'vue'
import useVideo from 'src/composables/useVideo'
import Player from 'src/components/player/Test.vue'
import { VideoProps } from 'src/interfaces/video'

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
      required: false
    }
  },

  setup (props: VideoProps) {
    const { id } = toRefs(props)
    const { video } = useVideo({ id })

    return {
      video
    }
  }
})
</script>
