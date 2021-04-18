<template>
  <div
    v-if="stream && stream.readyState > 0"
    class="absolute-top-right player-control player-settings"
  >
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
          >
            <q-item-section>Edit Model</q-item-section>
          </q-item>

          <q-item
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
import useFilters from 'src/composables/useFilters'
import usePlayer from 'src/composables/usePlayer'
import { computed, defineComponent, PropType } from 'vue'

export default defineComponent({
  name: 'ShareControl',

  props: {
    module: {
      type: String as PropType<string>,
      required: true
    }
  },

  setup (props) {
    const { request, stream, sendRequest } = usePlayer({ module: props.module })
    const { formatTimestamp } = useFilters()

    const currentTime = computed(() => formatTimestamp(stream.value?.currentTime || 0))
    const duration = computed(() => formatTimestamp(stream.value?.duration || 0))

    return {
      request,
      stream,
      currentTime,
      duration,
      sendRequest
    }
  }
})
</script>
