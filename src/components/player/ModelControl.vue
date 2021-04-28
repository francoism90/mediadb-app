<template>
  <q-icon
    name="more_vert"
    color="white"
    class="cursor-pointer"
    size="24px"
  >
    <q-menu
      class="menu"
      anchor="top end"
      square
      transition-duration="0"
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
import { useQuasar } from 'quasar'
import VideoEdit from 'src/components/video/Edit.vue'
import usePlayer from 'src/composables/usePlayer'
import { update } from 'src/repositories/media'
import { defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'Menu',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const $q = useQuasar()

    const { media, model, properties } = usePlayer({ module: props.module })

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
        thumbnail: properties.value?.currentTime || 10
      })

      $q.notify({
        type: 'positive',
        message: 'The thumbnail will be updated!'
      })
    }

    return {
      properties,
      editModel,
      thumbnailMedia
    }
  }
})
</script>
