<!-- <template>
  <q-dialog
    ref="dialogRef"
    class="search"
    position="top"
    @hide="onDialogHide"
  >
    <q-card
      v-if="store?.id"
      class="q-dialog-plugin dialog"
    >
      <search-filters />

      <q-separator />

      <template v-if="store.params.query?.length">
        <q-scroll-area class="search-scroll">
          <q-pull-to-refresh @refresh="onRefresh">
            <q-infinite-scroll
              :key="store.id"
              @load="onLoad"
            >
              <div class="row justify-start items-start content-start q-col-gutter-md">
                <q-intersection
                  v-for="(item, index) in store.data"
                  :key="index"
                  class="col-12 search-item"
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
import { router } from 'src/router';
import { defineAsyncComponent, defineComponent, watch } from 'vue';

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
    const { fetch, store, filters } = useSearch();
    const { store: VideoStore } = useVideos();

    const onClick = async () => {
      VideoStore.reset({ query: store.params.query });

      await router.push({ name: 'home' });
      onDialogHide();
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onLoad = async (index: number, done: Function): Promise<void> => {
      try {
        await fetch();
        await done(!store.isFetchable);
      } catch {
        await done(true);
      }
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onRefresh = (done: Function): void => {
      store.reset();
      done();
    };

    watch(filters, () => store.reset(), { deep: true });

    return {
      store,
      dialogRef,
      onDialogHide,
      onDialogCancel,
      onClick,
      onLoad,
      onRefresh,
    };
  },
});
</script> -->
