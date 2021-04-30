<template>
  <router-view />
</template>


<script lang="ts">
import { useQuasar } from 'quasar'
import useDevice from 'src/composables/useDevice'
import { defineComponent, onMounted, watch } from 'vue'

export default defineComponent({
  name: 'App',

  setup () {
    const $q = useQuasar()
    const {
      setOverlaysWebView,
      hideStatusBar,
      showStatusBar,
      screenOrientationLandscape,
      screenOrientationUnlock
    } = useDevice()

    onMounted(async () => {
      await setOverlaysWebView()
    })

    watch(() => $q.fullscreen.isActive, async (value): Promise<void> => {
      if (!$q.platform.is.capacitor && !$q.platform.is.cordova) {
        return
      }

      if (value === true) {
        await hideStatusBar()
        await screenOrientationLandscape()
      } else {
        await showStatusBar()
        screenOrientationUnlock()
      }
    })
  }
})
</script>
