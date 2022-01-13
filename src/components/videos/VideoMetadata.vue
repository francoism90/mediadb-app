<template>
  <div v-if="video.overview">
    {{ video.overview }}
  </div>

  <q-list
    dense
    class="q-py-sm video-details-list"
  >
    <video-section v-if="duration">
      <template #label>
        Run Time :
      </template>
      {{ duration }}
    </video-section>

    <video-section v-if="video.season_number">
      <template #label>
        Season :
      </template>
      {{ video.season_number }}
    </video-section>

    <video-section v-if="video.episode_number">
      <template #label>
        Episode :
      </template>
      {{ video.episode_number }}
    </video-section>

    <video-section v-if="video.released_at">
      <template #label>
        Released Date :
      </template>
      {{ released }}
    </video-section>

    <video-section v-if="languages?.length">
      <template #label>
        Languages :
      </template>
      <tag-list :tags="languages" />
    </video-section>

    <video-section v-if="cast?.length">
      <template #label>
        Cast :
      </template>
      <tag-list :tags="cast" />
    </video-section>

    <video-section v-if="genres?.length">
      <template #label>
        Genres :
      </template>
      <tag-list :tags="genres" />
    </video-section>

    <video-section v-if="studios?.length">
      <template #label>
        Studios :
      </template>
      <tag-list :tags="studios" />
    </video-section>

    <video-section v-if="video.quality">
      <template #label>
        Resolution :
      </template>
      {{ video.quality }}
    </video-section>

    <video-section v-if="video.created_at">
      <template #label>
        Upload Date :
      </template>
      {{ created }}
    </video-section>
  </q-list>
</template>

<script lang="ts">
import { dateFormat, timeFormat } from 'src/helpers';
import { VideoModel } from 'src/interfaces';
import { computed, defineAsyncComponent, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideoMetadata',

  components: {
    TagList: defineAsyncComponent(() => import('components/tags/TagList.vue')),
    VideoSection: defineAsyncComponent(() => import('components/videos/VideoSection.vue')),
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const tagsByType = (type: string) => props.video.tags?.filter((tag) => tag.type === type);

    const cast = computed(() => tagsByType('actor'));
    const languages = computed(() => tagsByType('language'));
    const genres = computed(() => tagsByType('genre'));
    const studios = computed(() => tagsByType('studio'));

    const duration = computed(() => timeFormat(props.video.duration));
    const created = computed(() => dateFormat(props.video.created_at));
    const released = computed(() => dateFormat(props.video.released_at));

    return {
      cast,
      created,
      duration,
      genres,
      languages,
      released,
      studios,
    };
  },
});
</script>
