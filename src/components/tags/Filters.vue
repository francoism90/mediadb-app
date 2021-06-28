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
          Filter By List
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
          Filter By Tag
        </q-item-label>

        <q-item>
          <q-item-label class="full-width">
            <q-select
              v-model="store.query.filter.tags"
              :options="tags"
              class="q-my-sm"
              counter
              dense
              display-value="name"
              dropdown-icon="expand_more"
              emit-value
              filled
              map-options
              max-values="5"
              multiple
              option-label="name"
              option-value="slug"
              popup-content-class="bg-grey-10"
              square
              use-chips
              use-input
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
          </q-item-label>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { onBeforeMount } from 'vue';
import useVideos from 'src/composables/useVideos';
import useTagInput from 'src/composables/useTagInput';

export default {
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const { dialogRef, onDialogHide } = useDialogPluginComponent();
    const { store } = useVideos();
    const { fetch: fetchTags, reset: resetTags, data: tags } = useTagInput();

    const populateTags = async (): Promise<void> => {
      await fetchTags({
        filter: { id: store.query.filter?.tags },
        page: { number: 1, size: 5 },
      });
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const filterTags = async (val: string, update: Function, abort: Function): Promise<void> => {
      if (val.length < 1) {
        abort();
        return;
      }

      resetTags();

      await fetchTags({
        filter: { query: val },
        page: { number: 1, size: 5 },
        sort: 'recommended',
      });

      await update();
    };

    onBeforeMount(populateTags);

    return {
      dialogRef,
      onDialogHide,
      filterTags,
      store,
      tags,
    };
  },
};
</script>
