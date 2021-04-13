<template>
  <div class="container video-details q-py-md">
    <h1 class="text-h2 text-white ellipsis-2-lines">
      {{ video.name }}
    </h1>

    <div class="q-gutter-sm">
      <q-chip
        color="transparent"
        icon="visibility"
        :clickable="false"
        :ripple="false"
        dense
        dark
      >
        <span class="q-ml-xs text-body1">{{ video.views || 0 }} views</span>
      </q-chip>
    </div>

    <p v-if="video.overview">
      {{ video.overview }}
    </p>

    <q-list
      dense
      class="q-py-md video-details-list"
    >
      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Language :
        </q-item-section>

        <q-item-section class="text-white">
          English
        </q-item-section>
      </q-item>

      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Genre :
        </q-item-section>

        <q-item-section class="text-white">
          Action, Documentary
        </q-item-section>
      </q-item>

      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Studio :
        </q-item-section>

        <q-item-section class="text-white">
          English
        </q-item-section>
      </q-item>

      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Actor :
        </q-item-section>

        <q-item-section class="text-white">
          English
        </q-item-section>
      </q-item>

      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Run Time :
        </q-item-section>

        <q-item-section class="text-white">
          1hr 24 mins
        </q-item-section>
      </q-item>

      <q-item class="text-body2">
        <q-item-section class="text-grey-1 text-weight-medium video-details-label">
          Release Date :
        </q-item-section>

        <q-item-section class="text-white">
          14 Aug, 2018
        </q-item-section>
      </q-item>
    </q-list>
  </div>
</template>

<script lang="ts">
import useFilters from 'src/composables/useFilters'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideoDetails',

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const { formatTimestamp } = useFilters()

    const timestamp = computed(() => formatTimestamp(props.video.clip?.duration || 0))

    return {
      timestamp
    }
  }
})
</script>
