<template>
  <router-view />
</template>


<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'App',

  setup () {
    const $q = useQuasar()

    watch(() => $q.fullscreen.isActive, async (value): Promise<void> => {
      if (!$q.platform.is.capacitor && !$q.platform.is.cordova) {
        return
      }

      if (value === true) {
        await window.screen.orientation.lock('landscape')
      } else {
        window.screen.orientation.unlock()
      }
    })
  }
})
</script>
