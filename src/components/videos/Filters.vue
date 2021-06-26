<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <div class="video-filter-container">
      <q-list
        dense
        class="video-filter-list"
      >
        <q-item-label
          header
          class="video-filter-search"
        >
          <q-input
            v-model="store.query.filter.query"
            autofocus
            borderless
            color="grey-10"
            clearable
            debounce="500"
            dense
            hide-bottom-space
            input-class="text-caption"
            placeholder="Search videos.."
            type="text"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item-label>

        <q-item-label
          header
          class="video-filter-header"
        >
          Filter On List
        </q-item-label>

        <q-item
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-checkbox
              v-model="store.query.filter.favorites"
              size="sm"
              :true-value="1"
              :false-value="null"
            />
          </q-item-section>
          <q-item-section>Bookmarks</q-item-section>
        </q-item>

        <q-item
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-checkbox
              v-model="store.query.filter.favorites"
              size="sm"
              :true-value="1"
              :false-value="null"
            />
          </q-item-section>
          <q-item-section>Watchlist</q-item-section>
        </q-item>

        <q-separator
          spaced
          class="transparent"
        />

        <q-item-label
          header
          class="video-filter-header"
        >
          Filter On Tags
        </q-item-label>

        <q-item
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-checkbox
              v-model="store.query.filter.favorites"
              size="sm"
              :true-value="1"
              :false-value="null"
            />
          </q-item-section>
          <q-item-section>Bookmarks</q-item-section>
        </q-item>

        <q-item
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-checkbox
              v-model="store.query.filter.favorites"
              size="sm"
              :true-value="1"
              :false-value="null"
            />
          </q-item-section>
          <q-item-section>Watchlist</q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar';
import useVideos from 'src/composables/useVideos';

const sorters = [
  { label: 'Recommended', value: 'recommended' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Recent', value: '-created_at' },
  { label: 'Longest', value: '-duration' },
  { label: 'Shortest', value: 'duration' },
];

export default {
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const { store } = useVideos();

    return {
      dialogRef,
      onDialogHide,
      store,
      sorters,
    };
  },
};
</script>
