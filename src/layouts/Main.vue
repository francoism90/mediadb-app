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
      <q-toolbar>
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
      v-model="drawerModel"
      behavior="desktop"
      class="drawer"
      bordered
      overlay
      :width="260"
    >
      <filters />
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Account from 'src/components/ui/Account.vue';
import Filters from 'src/components/ui/Filters.vue';
import useDrawer from 'src/composables/useDrawer';
import useSession from 'src/composables/useSession';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Filters,
    Account,
  },

  setup() {
    const { drawer, setDrawer } = useDrawer();
    const { user } = useSession();

    const layoutKey = computed(() => user.value.id || +new Date());

    const drawerModel = computed({
      get: () => drawer.value,
      set: (value) => { setDrawer(value); },
    });

    return {
      layoutKey,
      drawer,
      drawerModel,
    };
  },
});
</script>
