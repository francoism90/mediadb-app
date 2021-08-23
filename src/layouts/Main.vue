<template>
  <q-layout
    :key="layoutKey"
    view="hHh lpR fFf"
  >
    <q-header
      bordered
      class="header row no-wrap items-center content-center bg-dark"
      height-hint="58"
    >
      <q-toolbar>
        <q-icon
          name="o_menu"
          class="cursor-pointer q-mr-md"
          size="24px"
          aria-label="Account"
          @click="toggleDrawer"
        />

        <q-toolbar-title>
          <router-link
            to="/"
            class="text-body2 cursor-pointer"
          >
            MediaDB
          </router-link>
        </q-toolbar-title>
      </q-toolbar>

      <q-toolbar class="col-auto q-gutter-sm">
        <account />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="drawer"
      behavior="mobile"
      class="drawer"
      bordered
      overlay
      :width="300"
    >
      <drawer />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Account from 'src/components/ui/Account.vue';
import Drawer from 'src/components/ui/Drawer.vue';
import useSession from 'src/composables/useSession';
import { computed, defineComponent, ref } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Account,
    Drawer,
  },

  setup() {
    const drawer = ref(false);

    const { store } = useSession();
    const layoutKey = computed(() => store.user?.id || +new Date());

    const toggleDrawer = (): void => {
      drawer.value = !drawer.value;
    };

    return {
      layoutKey,
      toggleDrawer,
      drawer,
    };
  },
});
</script>
