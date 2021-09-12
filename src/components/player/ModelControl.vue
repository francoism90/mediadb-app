<template>
  <q-list
    bordered
    dense
    separator
    style="width: 250px; max-width: 100vw;"
  >
    <q-item
      v-close-popup
      clickable
      @click="edit"
    >
      <q-item-section side>
        <q-icon name="o_movie" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          Edit Video
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      v-close-popup
      clickable
      @click="capture"
    >
      <q-item-section side>
        <q-icon name="o_photo_camera" />
      </q-item-section>

      <q-item-section>
        <q-item-label>
          Set as Thumbnail
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-item
      clickable
      @click="$emit('setComponent', 'QualityControl')"
    >
      <q-item-section side>
        <q-icon name="o_video_settings" />
      </q-item-section>

      <q-item-section>Quality</q-item-section>

      <q-item-section side>
        <q-icon name="keyboard_arrow_right" />
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import VideoEdit from 'src/components/video/Edit.vue';
import useDash from 'src/composables/useDash';
import { VideoModel } from 'src/interfaces/video';
import { save } from 'src/repositories/video';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelControl',

  emits: ['setComponent'],

  setup() {
    const { store } = useDash();
    const $q = useQuasar();

    const capture = async (): Promise<void> => {
      if (store.properties?.time < 1) return;

      await save(<VideoModel>{
        ...store.model,
        ...{ capture_time: store.properties?.time || 0 },
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
          video: store.model,
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
