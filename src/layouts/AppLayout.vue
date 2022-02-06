<template>
  <q-layout
    :key="sessionKey"
    view="hhh lpR fff"
  >
    <q-header
      class="header container container-fluid"
      height-hint="80"
      reveal
    >
      <q-toolbar>
        <router-link
          class="header-logo"
          :to="{ name: 'home' }"
        >
          MediaDB
        </router-link>

        <q-space />

        <div class="q-gutter-x-none">
          <q-btn
            class="btn-primary header-item q-pa-sm"
            icon="tag"
            size="14px"
            @click="toggleDialog"
          />

          <q-btn
            class="btn-primary header-item q-pa-sm"
            icon="casino"
            size="14px"
            :to="{ name: 'roulette' }"
          />

          <q-btn
            class="btn-primary header-item q-pa-sm"
            icon="logout"
            size="14px"
            :to="{ name: 'logout' }"
          />
        </div>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { computed, defineAsyncComponent, defineComponent, onBeforeUnmount, onMounted } from 'vue';

const tagComponent = defineAsyncComponent(() => import('components/tags/TagDialog.vue'));

export default defineComponent({
  name: 'AppLayout',

  setup() {
    const $q = useQuasar();
    const { store, subscribe, unsubscribe } = useSession();

    const sessionKey = computed(() => store.token || +new Date());

    const toggleDialog = () => $q.dialog({ component: tagComponent });

    onBeforeUnmount(() => unsubscribe());
    onMounted(() => subscribe());

    return {
      sessionKey,
      toggleDialog,
    };
  },
});
</script>
