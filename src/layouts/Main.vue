<template>
  <q-layout
    :key="layoutKey"
    view="hHh lpR fFf"
  >
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

        <search-videos v-show="currentRouteName === 'home'" />
        <search-tags v-show="currentRouteName === 'tags'" />

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
import SearchTags from 'src/components/tags/Search.vue'
import SearchVideos from 'src/components/videos/Search.vue'
import useRouter from 'src/composables/useRouter'
import useSession from 'src/composables/useSession'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Drawer,
    SearchTags,
    SearchVideos,
    Account
  },

  setup () {
    const drawer = ref(false)

    const { router, currentRouteName } = useRouter()
    const { user } = useSession()

    const layoutKey = computed(() => user.value.id || '')

    const historyBack = () => router.back()
    const historyForward = () => router.forward()

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      drawer,
      layoutKey,
      currentRouteName,
      toggleDrawer,
      historyBack,
      historyForward
    }
  }
})
</script>
