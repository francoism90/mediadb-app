<template>
  <div class="video-details q-py-md">
    <h1 class="text-h3 text-white ellipsis-2-lines">
      {{ title }}
    </h1>

    <div class="q-gutter-sm text-white">
      <q-chip
        color="transparent"
        icon="visibility"
        :clickable="false"
        :ripple="false"
        dense
      >
        <span class="q-ml-xs text-body1">{{ model.views || 0 }} views</span>
      </q-chip>
    </div>

    <p v-if="model.overview">
      {{ model.overview }}
    </p>

    <q-list
      dense
      class="q-py-md video-details-list"
    >
      <item v-if="model.season_number">
        <template #label>
          Season :
        </template>
        {{ model.season_number }}
      </item>

      <item v-if="model.episode_number">
        <template #label>
          Episode :
        </template>
        {{ model.episode_number }}
      </item>

      <item v-if="model.released_at">
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

      <item v-if="model.clip?.resolution">
        <template #label>
          Resolution :
        </template>
        {{ model.clip?.resolution?.label }}
      </item>

      <item v-if="model.created_at">
        <template #label>
          Upload Date :
        </template>
        {{ created }}
      </item>
    </q-list>
  </div>
</template>

<script lang="ts">
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
    const { formatDate, formatTime, formatTitle } = useFilters();

    const tagsByType = (type: string) => store.data.tags?.filter((tag) => tag.type === type);

    const title = computed(() => formatTitle([
      [store.data.season_number, store.data.episode_number].join(''),
      store.data.name,
    ]));

    const duration = computed(() => formatTime(store.data.clip?.duration || 0));
    const created = computed(() => formatDate(store.data.created_at || Date.now()));
    const released = computed(() => formatDate(store.data.release_date || Date.now()));

    const cast = computed(() => tagsByType('actor'));
    const languages = computed(() => tagsByType('language'));
    const genres = computed(() => tagsByType('genre'));
    const studios = computed(() => tagsByType('studio'));

    return {
      title,
      cast,
      languages,
      genres,
      studios,
      duration,
      created,
      released,
    };
  },
});
</script>
