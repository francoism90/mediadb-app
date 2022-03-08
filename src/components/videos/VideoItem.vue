<template>
  <q-card
    class="video-item transparent"
    draggable="false"
    flat
    square
  >
    <router-link :to="{ name: 'video', params: { id: item.id, slug: item.slug } }">
      <q-img
        :alt="item.title"
        :src="item.poster_url"
        :draggable="false"
        :ratio="16/9"
        loading="lazy"
        class="video-item-thumb cursor-pointer"
        img-class="video-item-img"
        fit="fill"
        no-spinner
        no-transition
      />
    </router-link>

    <q-card-section class="video-item-content">
      <div class="row no-wrap">
        <div class="col">
          <div class="video-item-title ellipsis-2-lines">
            {{ item.title }}
          </div>

          <div class="video-item-meta ellipsis-2-lines">
            {{ duration }}
          </div>

          <div
            v-if="item.tags?.length"
            class="video-item-tags q-py-xs q-gutter-xs"
          >
            <q-chip
              v-for="tag in item.tags.slice(0, 5)"
              :key="tag.id"
              :label="tag.name"
              class="video-item-tag"
              clickable
              text-color="grey-6"
              size="0.95em"
              dense
              square
              @click="filterTag(tag)"
            />

            <span v-if="item.tags.length >= 6">...</span>
          </div>
        </div>

        <div class="col-auto">
          <q-icon
            aria-label="More actions"
            class="video-item-meta cursor-pointer"
            name="more_vert"
            size="24px"
            right
          >
            <q-menu
              anchor="top right"
              class="menu"
              self="top right"
              square
              transition-duration="0"
            >
              <q-list dense>
                <q-item
                  v-for="(action, index) in actions"
                  :key="index"
                  v-close-popup
                  clickable
                  @click="this[action.callback]()"
                >
                  <q-item-section>
                    <q-item-label>
                      {{ action.label }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </q-list>
            </q-menu>
          </q-icon>
        </div>
      </div>
    </q-card-section>
  </q-card>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useVideo } from 'src/composables/useVideo';
import { useVideos } from 'src/composables/useVideos';
import { timeFormat } from 'src/helpers';
import { TagModel, VideoModel } from 'src/interfaces';
import { computed, defineComponent, PropType } from 'vue';

const actions = [
  {
    label: 'Save to Watch Later',
    callback: 'followModel',
  },
  {
    label: 'Save to Favorites',
    callback: 'favoriteModel',
  },
];

export default defineComponent({
  name: 'VideoCard',

  props: {
    item: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { reset } = useVideos();
    const { favorite, follow } = useVideo();

    const duration = computed(() => timeFormat(props.item.duration));

    const favoriteModel = async () => {
      await favorite(props.item.id);

      $q.notify({ message: 'Added to bookmarks.', icon: 'favorite' });
    };

    const followModel = async () => {
      await follow(props.item.id);

      $q.notify({ message: 'Added to watchlist.', icon: 'watch_later' });
    };

    const filterTag = (tag: TagModel) => reset({ query: tag.name });

    return {
      favoriteModel,
      followModel,
      filterTag,
      actions,
      duration,
    };
  },
});
</script>
