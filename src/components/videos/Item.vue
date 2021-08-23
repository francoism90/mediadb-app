<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    flat
    square
  >
    <router-link
      :to="{ name: 'video', params: { id: video.id, slug: video.slug }}"
      class="video-item-placeholder"
    >
      <q-img
        :alt="video.name"
        :src="video.thumbnail_url"
        loading="lazy"
        placeholder-src="~assets/placeholder/16x16.webp"
        class="video-item-thumbnail"
        img-class="video-item-thumbnail"
        no-spinner
        no-transition
      />

      <div class="absolute-bottom-right">
        <q-chip
          class="transparent"
          size="16px"
          :icon="`${video.clip?.resolution.icon}`"
        >
          <span class="text-caption">{{ duration }}</span>
        </q-chip>
      </div>
    </router-link>

    <q-card-section class="q-py-none q-px-sm">
      <div class="q-py-sm text-weight-medium ellipsis-2-lines">
        {{ name }}
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
