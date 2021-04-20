<template>
  <div class="video-details q-py-md">
    <h1 class="text-h2 text-white ellipsis-2-lines">
      {{ video.name }}
    </h1>

    <div class="q-gutter-sm text-white">
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
      <item v-if="languages.length">
        <template #label>
          Languages :
        </template>
        <list :tags="languages" />
      </item>

      <item v-if="cast.length">
        <template #label>
          Cast :
        </template>
        <list :tags="cast" />
      </item>

      <item v-if="genres.length">
        <template #label>
          Genres :
        </template>
        <list :tags="genres" />
      </item>

      <item v-if="studios.length">
        <template #label>
          Studios :
        </template>
        <list :tags="studios" />
      </item>

      <item v-if="duration">
        <template #label>
          Run Time :
        </template>
        {{ duration }}
      </item>

      <item v-if="video.release_date">
        <template #label>
          Release Date:
        </template>
        {{ released }}
      </item>

      <item v-if="video.created_at">
        <template #label>
          Upload Date:
        </template>
        {{ created }}
      </item>
    </q-list>
  </div>
</template>

<script lang="ts">
import List from 'src/components/tags/List.vue'
import Item from 'src/components/video/Item.vue'
import useFilters from 'src/composables/useFilters'
import { Video } from 'src/interfaces/video'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'VideoDetails',

  components: {
    Item,
    List
  },

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  setup (props) {
    const { formatDate, formatTime } = useFilters()

    const tagsByType = (type: string) => props.video.tags?.filter(tag => tag.type === type)

    const cast = computed(() => tagsByType('actor'))
    const languages = computed(() => tagsByType('language'))
    const genres = computed(() => tagsByType('genre'))
    const studios = computed(() => tagsByType('studio'))

    const duration = computed(() => formatTime(props.video.clip?.duration || 0))
    const created = computed(() => formatDate(props.video.created_at || Date.now()))
    const released = computed(() => formatDate(props.video.release_date || Date.now()))

    return {
      cast,
      languages,
      genres,
      studios,
      duration,
      created,
      released
    }
  }
})
</script>
