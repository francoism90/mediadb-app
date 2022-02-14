<template>
  <q-dialog
    ref="dialogRef"
    position="top"
    @hide="onDialogHide"
  >
    <q-card
      v-if="store?.id"
      class="q-dialog-plugin dialog"
    >
      <tag-filters />

      <q-separator />

      <q-scroll-area class="tag-search-scroll">
        <q-pull-to-refresh @refresh="onRefresh">
          <q-infinite-scroll
            :key="store.id"
            @load="onLoad"
          >
            <div class="row justify-start items-start content-start q-col-gutter-md">
              <q-intersection
                v-for="(item, index) in store.data"
                :key="index"
                class="col-xs-6 col-sm-6 col-md-4 tag-item"
              >
                <tag-item :tag="item" />
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
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import { useTags } from 'src/composables/useTags';
import { defineAsyncComponent, defineComponent, watch } from 'vue';

export default defineComponent({
  name: 'TagDialog',

  components: {
    TagFilters: defineAsyncComponent(() => import('components/tags/TagFilters.vue')),
    TagItem: defineAsyncComponent(() => import('components/tags/TagItem.vue')),
  },

  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
    const { fetch, store, filters } = useTags();

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
      onLoad,
      onRefresh,
    };
  },
});
</script>
