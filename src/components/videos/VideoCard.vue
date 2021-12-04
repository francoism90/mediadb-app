<template>
  <q-card
    class="video-item"
    draggable="false"
    flat
    square
  >
    <router-link
      :to="{ name: 'video', params: { id: video.id, slug: video.slug }}"
      class="poster"
    >
      <q-img
        :alt="video.title"
        :src="video.poster_url"
        :draggable="false"
        loading="lazy"
        class="poster-image"
        fit="fill"
        no-spinner
        no-transition
      />
    </router-link>

    <q-card-section class="q-px-none q-py-md">
      <div class="row no-wrap">
        <div class="col">
          <div class="q-pb-xs text-weight-medium ellipsis-2-lines">
            {{ video.title }}
          </div>

          <div class="q-pb-xs text-grey-5 text-weight-medium ellipsis-2-lines">
            {{ duration }}
          </div>

          <tag-chips
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
import { useQuasar } from 'quasar';
import { useAcquaintances } from 'src/composables/useAcquaintances';
import { timeFormat } from 'src/helpers';
import { VideoModel } from 'src/interfaces/video';
import { computed, defineAsyncComponent, defineComponent, PropType } from 'vue';

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

  components: {
    TagChips: defineAsyncComponent(() => import('components/tags/TagChips.vue')),
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();
    const { favorited, following } = useAcquaintances();

    const duration = computed(() => timeFormat(props.video.duration));

    const favoriteModel = async () => {
      await favorited(props.video, true);

      $q.notify({ message: 'Added to bookmarks.', icon: 'favorite' });
    };

    const followModel = async () => {
      await following(props.video, true);

      $q.notify({ message: 'Added to watchlist.', icon: 'watch_later' });
    };

    return {
      favoriteModel,
      followModel,
      actions,
      duration,
    };
  },
});
</script>
