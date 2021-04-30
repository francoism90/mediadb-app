<template>
  <router-view />
</template>


<script lang="ts">
import { useQuasar } from 'quasar'
import { defineComponent, onMounted, watch } from 'vue'
import { Plugins } from '@capacitor/core';

const { StatusBar } = Plugins;

export default defineComponent({
  name: 'App',

  setup () {
    const $q = useQuasar()

    const screenOrientationLandscape = async (): Promise<void> => {
      await window.screen.orientation.lock('landscape')
    }

    const screenOrientationUnlock = (): void => {
      window.screen.orientation.unlock()
    }

    const hideStatusBar = async (): Promise<void> => {
      await StatusBar.hide()
    }

    const showStatusBar = async (): Promise<void> => {
      await StatusBar.show()
    }

    onMounted(async () => {
      // Display content under transparent status bar (Android only)
      await StatusBar.setOverlaysWebView({ overlay: true })
    }),

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
