<template>
  <q-list
    bordered
    dense
    separator
    class="player-menu"
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
      :disable="!store.properties?.ready || store.properties?.time < 1"
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
      :disable="!store.properties?.ready"
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
      :disable="!store.properties?.textTracks?.length"
      clickable
      @click="$emit('setComponent', 'CaptionControl')"
    >
      <q-item-section side>
        <q-icon name="o_closed_caption" />
      </q-item-section>

      <q-item-section>Captions</q-item-section>

      <q-item-section side>
        <div class="row items-center justify-end">
          <span class="text-caption" />

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
import VideoEdit from 'src/components/video/Edit.vue';
import useDash from 'src/composables/useDash';
import useFilters from 'src/composables/useFilters';
import { VideoModel } from 'src/interfaces/video';
import { save } from 'src/repositories/video';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelControl',

  emits: ['setComponent'],

  setup() {
    const { store } = useDash();
    const { formatResolution } = useFilters();
    const $q = useQuasar();

    const capture = async (): Promise<void> => {
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

    const bitrate = computed(() => store.properties.videoTrack?.bitrateList.find(Boolean));

    const resolution = computed(() => formatResolution(
      bitrate.value?.height || 0,
      bitrate.value?.width || 0,
    ));

    return {
      capture,
      edit,
      resolution,
      store,
    };
  },
});
</script>
