<template>
  <q-card
    class="transparent video-item"
    draggable="false"
    flat
  >
    <router-link
      :to="{ name: 'video', params: { id: video.id, slug: video.slug }}"
      class="video-item-poster"
    >
      <q-img
        :alt="video.name"
        :src="video.poster_url"
        loading="lazy"
        class="video-item-image"
        height="100%"
        width="100%"
        no-spinner
      />
    </router-link>

    <q-card-section class="q-pa-none">
      <div class="row q-py-md">
        <div class="col">
          <div class="q-pb-xs text-weight-medium ellipsis-2-lines">
            {{ name }}
          </div>

          <div class="q-pb-xs text-grey-5 text-weight-medium ellipsis-2-lines">
            {{ duration }}
          </div>

          <chips
            v-if="video.tags?.length"
            :tags="video.tags"
          />
        </div>

        <div class="col-auto">
          <q-icon
            aria-label="More actions"
            class="cursor-pointer text-grey-5"
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
import { head } from 'lodash';
import { useQuasar } from 'quasar';
import Chips from 'src/components/tags/Chips.vue';
import useAcquaintances from 'src/composables/useAcquaintances';
import useFilters from 'src/composables/useFilters';
import useVideo from 'src/composables/useVideo';
import { VideoModel } from 'src/interfaces/video';
import { computed, defineComponent, PropType } from 'vue';

const actions = [
  {
    label: 'Save to Watch Later',
    callback: 'follow',
  },
  {
    label: 'Save to Favorites',
    callback: 'favorite',
  },
];

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
    const $q = useQuasar();
    const { formatTime, formatTitle } = useFilters();
    const { store } = useVideo();
    const { toggleFavorite, toggleFollow } = useAcquaintances();

    const favorite = async () => {
      const response = await toggleFavorite(props.video, true);
      store.update(<VideoModel>response.data);

      $q.notify({
        message: 'Added to bookmarks',
        icon: 'favorite',
      });
    };

    const follow = async () => {
      const response = await toggleFollow(props.video, true);
      store.update(<VideoModel>response.data);

      $q.notify({
        message: 'Added to watchlist',
        icon: 'watch_later',
      });
    };

    const name = computed(() => formatTitle([
      [props.video.season_number, props.video.episode_number].join(''),
      props.video.name,
    ]));

    const clip = computed(() => head(props.video.clips));
    const duration = computed(() => formatTime(clip.value?.metadata?.duration || 0));

    return {
      favorite,
      follow,
      actions,
      duration,
      name,
      store,
    };
  },
});
</script>
