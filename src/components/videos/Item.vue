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
        :alt="video.name"
        :src="video.poster_url"
        loading="lazy"
        class="poster-image"
        draggable="false"
        fit="fill"
        no-spinner
        no-transition
      />
    </router-link>

    <q-card-section class="q-px-none q-py-md">
      <div class="row no-wrap">
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
import { useQuasar } from 'quasar';
import { VideoModel } from 'src/interfaces/video';
import { favorite, follow } from 'src/repositories/user';
import { timeFormat, titleFormat } from 'src/utils/format';
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
  name: 'VideosItem',

  components: {
    Chips: defineAsyncComponent(() => import('components/tags/Chips.vue')),
  },

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  setup(props) {
    const $q = useQuasar();

    const favoriteModel = async () => {
      await favorite(props.video, true);

      $q.notify({
        message: 'Added to bookmarks',
        icon: 'favorite',
      });
    };

    const followModel = async () => {
      await follow(props.video, true);

      $q.notify({
        message: 'Added to watchlist',
        icon: 'watch_later',
      });
    };

    const name = computed(() => titleFormat([
      [props.video.season_number, props.video.episode_number].join(''),
      props.video.name,
    ]));

    const duration = computed(() => timeFormat(props.video.duration));

    return {
      favoriteModel,
      followModel,
      actions,
      duration,
      name,
    };
  },
});
</script>
