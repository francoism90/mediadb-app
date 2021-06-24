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

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import Account from 'src/components/ui/Account.vue';
import useSession from 'src/composables/useSession';
import { computed, defineComponent } from 'vue';

export default defineComponent({
  name: 'MainLayout',

  components: {
    Account,
  },

  setup() {
    const { store } = useSession();
    const layoutKey = computed(() => store.user?.id || +new Date());

    return {
      layoutKey,
    };
  },
});
</script>
