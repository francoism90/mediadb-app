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
      >
        <q-item
          v-close-popup
          clickable
          @click="editModel"
        >
          <q-item-section>Edit Model</q-item-section>
        </q-item>

        <q-item
          v-close-popup
          clickable
          @click="thumbnailMedia"
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
import usePlayer from 'src/composables/usePlayer';
import { MediaModel } from 'src/interfaces/media';
import { VideoModel } from 'src/interfaces/video';
import { save } from 'src/repositories/media';
import { computed, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'ModelControl',

  setup() {
    const $q = useQuasar();
    const { store } = usePlayer();

    const model = computed(() => store.model as VideoModel);
    const media = reactive(<MediaModel>model.value.clip);

    const editModel = (): void => {
      $q.dialog({
        component: VideoEdit,
        componentProps: {
          video: model.value,
        },
      });
    };

    const thumbnailMedia = async (): Promise<void> => {
      media.id = model.value.clip?.id || '';
      media.thumbnail = store.properties.currentTime || 10;

      await save(media);

      $q.notify({
        type: 'positive',
        message: 'The thumbnail will be updated!',
      });
    };

    return {
      model,
      editModel,
      thumbnailMedia,
    };
  },
});
</script>
