<template>
  <q-dialog
    ref="dialogRef"
    class="search"
    position="top"
    @hide="onDialogHide"
  >
    <q-card class="q-dialog-plugin dialog">
      <search-filters />

      <q-separator />

      <template v-if="state.filters?.query?.length">
        <q-scroll-area class="search-scroll">
          <q-pull-to-refresh @refresh="onRefresh">
            <q-infinite-scroll
              :key="state.id || 0"
              :offset="250"
              @load="onLoad"
            >
              <div class="row justify-start items-start content-start q-col-gutter-md">
                <q-intersection
                  v-for="(item, index) in state.data"
                  :key="index"
                  class="col-12 search-placeholder"
                >
                  <search-item :model="item" />
                </q-intersection>
              </div>

              <template #loading>
                <div class="row no-wrap justify-center q-py-lg">
                  <q-spinner-oval
                    color="primary"
                    size="2em"
                  />
                </div>
              </template>
            </q-infinite-scroll>
          </q-pull-to-refresh>
        </q-scroll-area>

        <q-card-actions class="q-px-none">
          <q-btn
            icon="manage_search"
            class="btn btn-submit full-width"
            label="All Results"
            no-caps
            @click="onClick"
          />
        </q-card-actions>
      </template>

      <template v-else>
        <q-card-section class="search-intro">
          Enter a search term to find results in the library.
        </q-card-section>
      </template>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useSearch } from 'src/composables/useSearch';
import { useVideos } from 'src/composables/useVideos';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'SearchDialog',

  components: {
    SearchFilters: defineAsyncComponent(() => import('components/search/SearchFilters.vue')),
    SearchItem: defineAsyncComponent(() => import('components/search/SearchItem.vue')),
  },

  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
    const { populate, reset, state } = useSearch();
    const { reset: query } = useVideos();

    const onClick = async () => {
      await query({ query: state.filters?.query || '' });
      onDialogHide();
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await populate();
        await done(!state.links?.next);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = async (done: Function): Promise<void> => {
      await reset();
      done();
    };

    return {
      onDialogHide,
      onDialogCancel,
      onClick,
      onLoad,
      onRefresh,
      state,
      dialogRef,
    };
  },
});
</script>
