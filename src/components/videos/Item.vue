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

      <div class="absolute-bottom-right q-mx-sm">
        <q-chip
          :clickable="false"
          :icon="`${video.clip?.resolution.icon}`"
          class="transparent"
          dense
          size="16px"
        >
          <span class="text-caption">{{ duration }}</span>
        </q-chip>
      </div>
    </router-link>

    <q-card-section class="q-pa-none">
      <div class="row">
        <div class="col q-pa-sm">
          <div class="q-pb-xs text-weight-medium ellipsis-2-lines">
            {{ name }}
          </div>

          <chips
            v-if="video.tags.length"
            :tags="video.tags"
          />
        </div>

        <div class="col-auto">
          <q-btn
            class="q-my-sm q-mx-xs"
            icon="more_vert"
            padding="xs"
            size="14px"
            fab
          >
            <q-menu
              anchor="top right"
              class="menu"
              self="top right"
              square
              transition-duration="0"
            >
              <q-list
                bordered
                dense
                padding
                style="width: 200px; max-width: 100vw;"
              >
                <q-item
                  v-close-popup
                  clickable
                >
                  <q-item-section>
                    <q-item-label>Save to Watch later</q-item-label>
                  </q-item-section>
                </q-item>

                <q-item
                  v-close-popup
                  clickable
                >
                  <q-item-section>
                    <q-item-label>Save to Favorites</q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-btn>
        </div>
      </div>
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
