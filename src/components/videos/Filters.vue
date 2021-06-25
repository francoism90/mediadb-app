<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-list
      dense
      class="video-filters"
    >
      <q-item-label
        header
        class="video-filters-header"
      >
        Content filtering
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
  </q-dialog>
</template>

<script>
import { useDialogPluginComponent } from 'quasar';
import useVideos from 'src/composables/useVideos';

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
    };
  },
};
</script>
