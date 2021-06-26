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
          <q-item-section>
            <q-select
              v-model="store.query.filter.tags"
              display-value="name"
              option-value="id"
              emit-value
              map-options
              multiple
              use-chips
              use-input
              :options="tags"
              @filter="filterTags"
            >
              <template #option="scope">
                <q-item v-bind="scope.itemProps">
                  <q-item-section>
                    <q-item-label>
                      {{ scope.opt.name }}
                    </q-item-label>

                    <q-item-label
                      caption
                      class="text-capitalize"
                    >
                      {{ scope.opt.type }}
                    </q-item-label>
                  </q-item-section>
                </q-item>
              </template>
            </q-select>
          </q-item-section>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import useVideos from 'src/composables/useVideos';
import useTagInput from 'src/composables/useTagInput';

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
    const { fetch: fetchTags, reset: resetTags, data: tags } = useTagInput();

    // eslint-disable-next-line @typescript-eslint/ban-types
    const filterTags = async (val: string, update: Function, abort: Function): Promise<void> => {
      resetTags();

      if (val.length < 1) {
        abort();
        return;
      }

      await fetchTags({ filter: { query: val }, page: { number: 1, size: 5 } });
      await update();
    };

    return {
      dialogRef,
      onDialogHide,
      filterTags,
      store,
      sorters,
      tags,
    };
  },
};
</script>
