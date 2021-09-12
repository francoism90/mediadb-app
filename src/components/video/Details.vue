<template>
  <div
    :key="store.data?.id"
    class="video-details q-py-md"
  >
    <h1 class="text-h3 text-white ellipsis-2-lines">
      {{ store.data?.name }}
    </h1>

    <div class="q-gutter-sm text-white">
      <q-chip
        color="transparent"
        icon="visibility"
        :clickable="false"
        :ripple="false"
        dense
      >
        <span class="q-ml-xs text-body1">{{ store.data?.views || 0 }} views</span>
      </q-chip>
    </div>

    <p v-if="store.data?.overview">
      {{ store.data.overview }}
    </p>

    <q-list
      dense
      class="q-py-md video-details-list"
    >
      <item v-if="store.data?.season_number">
        <template #label>
          Season :
        </template>
        {{ store.data.season_number }}
      </item>

      <item v-if="store.data?.episode_number">
        <template #label>
          Episode :
        </template>
        {{ store.data.episode_number }}
      </item>

      <item v-if="store.data?.released_at">
        <template #label>
          Released Date :
        </template>
        {{ released }}
      </item>

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

      <item v-if="resolution">
        <template #label>
          Resolution :
        </template>
        {{ resolution?.label }}
      </item>

      <item v-if="store.data.created_at">
        <template #label>
          Upload Date :
        </template>
        {{ created }}
      </item>
    </q-list>
  </div>
</template>

<script lang="ts">
import { head } from 'lodash';
import List from 'src/components/tags/List.vue';
import Item from 'src/components/video/Item.vue';
import useFilters from 'src/composables/useFilters';
import useVideo from 'src/composables/useVideo';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoDetails',

  components: {
    Item,
    List,
  },

  setup() {
    const { store } = useVideo();
    const { formatDate, formatResolution, formatTime } = useFilters();

    const tagsByType = (type: string) => store.data.tags?.filter((tag) => tag.type === type);

    const clip = computed(() => head(store.data.clips));
    const duration = computed(() => formatTime(clip.value?.metadata?.duration || 0));
    const created = computed(() => formatDate(store.data.created_at || Date.now()));
    const released = computed(() => formatDate(store.data.release_date || Date.now()));
    const resolution = computed(() => formatResolution(
      clip.value?.metadata?.height || 0,
      clip.value?.metadata?.width || 0,
    ));

    const cast = computed(() => tagsByType('actor'));
    const languages = computed(() => tagsByType('language'));
    const genres = computed(() => tagsByType('genre'));
    const studios = computed(() => tagsByType('studio'));

    return {
      store,
      cast,
      languages,
      genres,
      studios,
      duration,
      resolution,
      created,
      released,
    };
  },
});
</script>
