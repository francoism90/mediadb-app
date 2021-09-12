<template>
  <q-icon
    name="more_vert"
    color="white"
    class="cursor-pointer"
    size="24px"
    right
  >
    <q-menu
      anchor="top right"
      class="menu"
      self="top right"
      square
      transition-duration="0"
      style="width: 160px; max-width: 100vw;"
    >
      <q-list
        bordered
        dense
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
import useDash from 'src/composables/useDash';
import { save } from 'src/repositories/video';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'ModelControl',

  setup() {
    const { store } = useDash();
    const $q = useQuasar();

    const capture = async (): Promise<void> => {
      await save({
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
