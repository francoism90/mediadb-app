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
      >
        <q-list style="min-width: 150px;">
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

    const { model, stream } = usePlayer({ module: props.module })

    const editModel = (): void => {
      $q.dialog({
        component: VideoEdit,
        componentProps: {
          video: model.value
        }
      })
    }

    return {
      stream,
      editModel
    }
  }
})
</script>
