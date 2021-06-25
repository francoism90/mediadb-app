<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <div class="video-filters">
      <q-input
        v-model="store.query.filter.query"
      />
    </div>
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
