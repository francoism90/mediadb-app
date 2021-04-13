<template>
  <q-page :key="id">
    <template v-if="!video">
      Loading ..
    </template>

    <template v-else>
      <video-player :video="video" />

      <div class="container">
        <video-details :video="video" />

        <q-separator
          color="primary"
          size="3px"
        />

        <video-related :video="video" />
      </div>
    </template>
  </q-page>
</template>

<script lang="ts">
import VideoPlayer from 'src/components/player/Video.vue'
import VideoDetails from 'src/components/video/Details.vue'
import VideoRelated from 'src/components/video/Related.vue'
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
    VideoPlayer,
    VideoRelated
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
