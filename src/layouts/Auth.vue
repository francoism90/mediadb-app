<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'Auth'

  // components: {
  // NavigationLink,
  // GlobalSearch
  // }

  // setup () {
  //   const drawerOpen = ref(false)

  //   return {
  //     essentialLinks: linksList,
  //     drawerOpen,
  //     toggleDrawer () {
  //       drawerOpen.value = !drawerOpen.value
  //     }
  //   }
  // }
})
</script>
