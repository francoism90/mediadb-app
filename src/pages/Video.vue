<template>
  <q-page>
    <template v-if="!video">
      Loading ..
    </template>

    <template v-else>
      <video-player :video="video" />
      <video-details :video="video" />
    </template>
  </q-page>
</template>

<script lang="ts">
import VideoPlayer from 'src/components/player/Video.vue'
import VideoDetails from 'src/components/video/Details.vue'
import useVideo from 'src/composables/useVideo'
import { defineComponent, toRefs } from 'vue'

export interface Props {
  id: string,
  slug?: string | null
}

export default defineComponent({
  name: 'VideoPage',

  components: {
    VideoDetails,
    VideoPlayer
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
