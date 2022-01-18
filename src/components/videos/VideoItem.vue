<template>
  <q-card
    class="video-item transparent"
    draggable="false"
    flat
    square
  >
    <router-link
      :to="{ name: 'video', params: { id: video.id, slug: video.slug }}"
      class="video-item-poster"
    >
      <q-img
        :alt="video.title"
        :src="video.poster_url"
        :draggable="false"
        loading="lazy"
        class="video-item-img"
        fit="fill"
        no-spinner
        no-transition
      />
    </router-link>

    <q-card-section class="video-item-body">
      <div class="row no-wrap">
        <div class="col">
          <div class="video-item-title q-pb-xs text-weight-medium ellipsis-2-lines">
            {{ video.title }}
          </div>

          <div class="video-item-duration q-pb-xs text-weight-medium ellipsis-2-lines">
            {{ duration }}
          </div>

          <div
            v-if="video.tags?.length"
            class="q-py-xs q-gutter-xs"
          >
            <q-chip
              v-for="tag in video.tags"
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
          </div>
        </div>

        <div class="col-auto">
          <q-icon
            aria-label="More actions"
            class="cursor-pointer text-grey-6"
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
              <q-list
                bordered
                dense
              >
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
import { TagModel } from 'src/interfaces';
import { VideoModel } from 'src/interfaces/video';
import { router } from 'src/router';
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
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { store } = useVideos();
    const { favorite, follow } = useVideo();

    const duration = computed(() => timeFormat(props.video.duration));

    const favoriteModel = async () => {
      await favorite(props.video?.id || '', <VideoModel>{ favorite: true });

      $q.notify({ message: 'Added to bookmarks.', icon: 'favorite' });
    };

    const followModel = async () => {
      await follow(props.video?.id || '', <VideoModel>{ following: true });

      $q.notify({ message: 'Added to watchlist.', icon: 'watch_later' });
    };

    const filterTag = async (tag: TagModel) => {
      store.reset({ tags: [tag.name] });

      await router.push({ name: 'home' });
    };

    return {
      actions,
      duration,
      favoriteModel,
      followModel,
      filterTag,
    };
  },
});
</script>
