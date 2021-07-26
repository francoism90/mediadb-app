<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    flat
    square
  >
    <router-link :to="{ name: 'video', params: { id: video.id, slug: video.slug }}">
      <q-img
        :alt="video.name"
        :src="video.thumbnail_url"
        loading="lazy"
        placeholder-src="~assets/placeholder/16x16.webp"
        class="video-item-placeholder cursor-pointer"
        img-class="video-item-placeholder"
      />
    </router-link>

    <q-card-section class="q-px-none q-py-dm">
      <div class="text-weight-medium ellipsis-2-lines">
        {{ name }}
      </div>

      <div class="q-py-xs text-caption text-grey-5">
        <span>{{ duration }}</span>
        <span class="q-px-sm">•</span>
        <span>{{ video.clip?.resolution }}</span>
      </div>

      <chips
        v-if="video.tags.length"
        :tags="video.tags"
      />
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import Chips from 'src/components/tags/Chips.vue';
import useFilters from 'src/composables/useFilters';
import { VideoModel } from 'src/interfaces/video';
import { computed, defineComponent, PropType } from 'vue';

export default defineComponent({
  name: 'VideosItem',

  components: {
    Chips,
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const { formatTime, formatTitle } = useFilters();

    const name = computed(() => formatTitle([
      [props.video.season_number, props.video.episode_number].join(''),
      props.video.name,
    ]));

    const duration = computed(() => formatTime(props.video.clip?.duration || 0));

    return {
      duration,
      name,
    };
  },
});
</script>
