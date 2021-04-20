<template>
  <div class="absolute-top-right player-control player-settings">
    <q-icon
      name="more_vert"
      color="white"
      class="cursor-pointer"
      size="32px"
    >
      <q-menu
        anchor="top left"
        self="top left"
        square
        class="menu"
      >
        <q-list
          bordered
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
            v-if="stream && stream.readyState > 0"
            v-close-popup
            clickable
            @click="thumbnailMedia"
          >
            <q-item-section>Set Thumbnail</q-item-section>
          </q-item>
        </q-list>
      </q-menu>
    </q-icon>
  </div>
</template>

<script lang="ts">
import { useQuasar } from 'quasar'
import VideoEdit from 'src/components/video/Edit.vue'
import usePlayer from 'src/composables/usePlayer'
import { update } from 'src/repositories/media'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ShareControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const $q = useQuasar()

    const { media, model, stream } = usePlayer({ module: props.module })

    const editModel = (): void => {
      $q.dialog({
        component: VideoEdit,
        componentProps: {
          video: model.value
        }
      })
    }

    const thumbnailMedia = async (): Promise<void> => {
      await update({
        id: media.value?.id || '',
        thumbnail: stream.value?.currentTime || 10
      })

      $q.notify({
        type: 'positive',
        message: 'The thumbnail will be updated!'
      })
    }

    return {
      stream,
      editModel,
      thumbnailMedia
    }
  }
})
</script>
