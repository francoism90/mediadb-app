<template>
  <q-list
    bordered
    dense
    separator
    class="player-video-menu"
  >
    <q-item
      v-close-popup
      :disable="!store.model"
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
      :disable="store.isWaiting"
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
      :disable="!store.isReady"
      clickable
      @click="$emit('setComponent', 'QualityControl')"
    >
      <q-item-section side>
        <q-icon name="o_video_settings" />
      </q-item-section>

      <q-item-section>Quality</q-item-section>

      <q-item-section side>
        <div class="row items-center justify-end">
          <span class="text-caption">{{ resolution?.label }}</span>

          <q-icon
            name="keyboard_arrow_right"
            size="24px"
            right
          />
        </div>
      </q-item-section>
    </q-item>

    <q-item
      :disable="!store.textTracks?.length"
      clickable
      @click="$emit('setComponent', 'CaptionControl')"
    >
      <q-item-section side>
        <q-icon name="o_closed_caption" />
      </q-item-section>

      <q-item-section>Captions</q-item-section>

      <q-item-section side>
        <div class="row items-center justify-end">
          <span class="text-caption">English</span>

          <q-icon
            name="keyboard_arrow_right"
            size="24px"
            right
          />
        </div>
      </q-item-section>
    </q-item>
  </q-list>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { usePlayer } from 'src/composables/usePlayer';
import { useVideo } from 'src/composables/useVideo';
import { defineAsyncComponent, defineComponent } from 'vue';

const editComponent = defineAsyncComponent(() => import('components/videos/VideoEditor.vue'));

export default defineComponent({
  name: 'ModelControl',

  emits: ['setComponent'],

  setup() {
    const $q = useQuasar();
    const { resolution, store } = usePlayer();
    const { update } = useVideo();

    const edit = () => $q.dialog({
      component: editComponent,
      componentProps: {
        id: store.model.id,
      },
    });

    const capture = async () => {
      await update(store.model.id, {
        ...store.model, ...{ thumbnail: store.properties?.time || store.model?.thumbnail },
      });

      $q.notify({ type: 'positive', message: 'The video thumbnail will be updated.' });
    };

    return {
      store,
      resolution,
      capture,
      edit,
    };
  },
});
</script>
