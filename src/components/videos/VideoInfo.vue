<template>
  <div
    v-if="store.id"
    class="video-details q-py-md"
  >
    <h1 class="text-h3 text-white ellipsis-2-lines">
      {{ store.data?.name }}
    </h1>

    <div class="q-gutter-sm text-white">
      <q-chip
        :clickable="false"
        :ripple="false"
        color="transparent"
        dense
        icon="visibility"
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
      <video-section v-if="duration">
        <template #label>
          Run Time :
        </template>
        {{ duration }}
      </video-section>

      <video-section v-if="store.data?.season_number">
        <template #label>
          Season :
        </template>
        {{ store.data.season_number }}
      </video-section>

      <video-section v-if="store.data?.episode_number">
        <template #label>
          Episode :
        </template>
        {{ store.data.episode_number }}
      </video-section>

      <video-section v-if="store.data?.released_at">
        <template #label>
          Released Date :
        </template>
        {{ released }}
      </video-section>

      <video-section v-if="languages.length">
        <template #label>
          Languages :
        </template>
        <tag-list :tags="languages" />
      </video-section>

      <video-section v-if="cast.length">
        <template #label>
          Cast :
        </template>
        <tag-list :tags="cast" />
      </video-section>

      <video-section v-if="genres.length">
        <template #label>
          Genres :
        </template>
        <tag-list :tags="genres" />
      </video-section>

      <video-section v-if="studios.length">
        <template #label>
          Studios :
        </template>
        <tag-list :tags="studios" />
      </video-section>

      <video-section v-if="store.data?.resolution">
        <template #label>
          Resolution :
        </template>
        {{ store.data.resolution }}
      </video-section>

      <video-section v-if="store.data?.created_at">
        <template #label>
          Upload Date :
        </template>
        {{ created }}
      </video-section>
    </q-list>
  </div>
</template>

<script lang="ts">
import { useVideo } from 'src/composables/useVideo';
import { dateFormat, timeFormat } from 'src/helpers';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'VideoInfo',

  components: {
    VideoSection: defineAsyncComponent(() => import('components/videos/VideoSection.vue')),
    TagList: defineAsyncComponent(() => import('components/tags/TagList.vue')),
  },

  setup() {
    const { store } = useVideo();

    const tagsByType = (type: string) => store.data?.tags?.filter((tag) => tag.type === type);

    const duration = computed(() => timeFormat(store.data?.duration));
    const created = computed(() => dateFormat(store.data?.created_at));
    const released = computed(() => dateFormat(store.data?.release_date));

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
      created,
      released,
    };
  },
});
</script>
