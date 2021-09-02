<template>
  <q-icon
    name="more_vert"
    color="white"
    class="cursor-pointer"
    size="24px"
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
        padding
        style="width: 200px; max-width: 100vw;"
        tabindex="0"
      >
        <q-item
          v-close-popup
          clickable
          @click="edit"
        >
          <q-item-section>Edit Model</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          @click="capture"
        >
          <q-item-section>Set Thumbnail</q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-icon>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import VideoEdit from 'src/components/video/Edit.vue';
import usePlayer from 'src/composables/useDash';
import useVideo from 'src/composables/useVideo';
import { save } from 'src/repositories/media';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelControl',

  setup() {
    const { store: playerStore } = usePlayer();
    const { store: videoStore } = useVideo();
    const $q = useQuasar();

    const capture = async (): Promise<void> => {
      if (!playerStore.media) return;

      await save({
        ...playerStore.media,
        // ...{ thumbnail: playerStore.properties?.currentTime || 0 },
      });

      $q.notify({
        type: 'positive',
        message: 'The thumbnail will be updated!',
      });
    };

    const edit = (): void => {
      $q.dialog({
        component: VideoEdit,
        componentProps: {
          video: videoStore.data,
        },
      });
    };

    return {
      capture,
      edit,
    };
  },
});
</script>
