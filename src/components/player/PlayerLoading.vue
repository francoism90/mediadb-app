<template>
  <loading-screen hide-dots>
    <q-spinner
      color="white"
      size="72px"
    />
  </loading-screen>
</template>

<script lang="ts">
import { LoadingScreen } from '@vime/vue-next'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'PlayerLoading',

  components: {
    LoadingScreen
  }
})
</script>
