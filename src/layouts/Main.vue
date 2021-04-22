<template>
  <q-layout
    :key="layoutKey"
    view="hHh lpR fFf"
  >
    <q-header
      bordered
      class="row no-wrap items-center content-center header"
      height-hint="58"
    >
      <q-toolbar class="header-container">
        <div class="row no-wrap items-center content-center">
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

        <div class="row no-wrap items-center content-center q-gutter-sm">
          <search />
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
import Account from 'src/components/ui/Account.vue'
import Drawer from 'src/components/ui/Drawer.vue'
import Search from 'src/components/ui/Search.vue'
import useRouter from 'src/composables/useRouter'
import useSession from 'src/composables/useSession'
import { computed, defineComponent, ref } from 'vue'

export default defineComponent({
  name: 'MainLayout',

  components: {
    Drawer,
    Search,
    Account
  },

  setup () {
    const drawer = ref(false)

    const { router } = useRouter()
    const { user } = useSession()

    const layoutKey = computed(() => user.value.id || '')

    const historyBack = () => router.back()
    const historyForward = () => router.forward()

    const toggleDrawer = () => {
      drawer.value = !drawer.value
    }

    return {
      layoutKey,
      drawer,
      toggleDrawer,
      historyBack,
      historyForward
    }
  }
})
</script>
