<template>
  <router-view />
</template>


<script lang="ts">
import { useQuasar } from 'quasar'
import useDevice from 'src/composables/useDevice'
import { defineComponent, watch } from 'vue'

export default defineComponent({
  name: 'App',

  setup () {
    const $q = useQuasar()
    const {
      hideStatusBar,
      showStatusBar,
      hideNavigationBar,
      showNavigationBar,
      screenOrientationLandscape,
      screenOrientationUnlock
    } = useDevice()

    watch(() => $q.fullscreen.isActive, async (value): Promise<void> => {
      if (!$q.platform.is.capacitor && !$q.platform.is.cordova) {
        return
      }

      if (value === true) {
        await hideStatusBar()
        await hideNavigationBar()
        await screenOrientationLandscape()
      } else {
        await showStatusBar()
        await showNavigationBar()
        screenOrientationUnlock()
      }
    })
  }
})
</script>
