<template>
  <q-layout view="hHh lpR fFf">
    <q-header
      bordered
      class="header row items-center content-center no-wrap"
      height-hint="58"
    >
      <q-toolbar class="header-container">
        <div class="row items-center content-center no-wrap">
          <q-icon
            name="o_menu"
            class="cursor-pointer q-mr-md"
            size="24px"
            aria-label="Account"
            @click="toggleDrawer"
          />

          <q-btn
            dense
            color="grey-10"
            icon="chevron_left"
            aria-label="Back"
            @click="historyBack"
          />

          <q-btn
            dense
            color="grey-10"
            icon="chevron_right"
            aria-label="Forward"
            class="q-ml-xs"
            @click="historyForward"
          />
        </div>

        <q-space />

        <search-videos v-show="routeName === 'home'" />

        <div class="row no-wrap items-center">
          <account />
        </div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      behavior="mobile"
      class="drawer"
      bordered
      overlay
      :width="260"
    >
      <drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Account from 'src/components/layout/Account.vue'
import Drawer from 'src/components/layout/Drawer.vue'
import SearchVideos from 'src/components/videos/Search.vue'
import { router } from 'src/router'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Drawer,
    SearchVideos,
    Account
  },

  setup () {
    const drawer = ref(false)

    const historyBack = () => router.back()
    const historyForward = () => router.forward()

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    const routeName = computed(() => router.currentRoute.value.name?.toString())

    return {
      drawer,
      toggleDrawer,
      historyBack,
      historyForward,
      routeName
    }
  }
})
</script>
