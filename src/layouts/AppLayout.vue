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
            class="btn header-item q-pa-sm"
            icon="o_search"
            size="14px"
            @click="videosDialog"
          />

          <q-btn
            class="btn header-item q-pa-sm"
            icon="tag"
            size="14px"
            @click="tagsDialog"
          />

          <q-btn
            class="btn header-item q-pa-sm"
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
import { tryOnBeforeUnmount, tryOnMounted } from '@vueuse/core';
import { useQuasar } from 'quasar';
import { useModels } from 'src/composables/useModels';
import { useSession } from 'src/composables/useSession';
import { computed, defineAsyncComponent, defineComponent } from 'vue';

const tagsComponent = defineAsyncComponent(() => import('components/tags/TagDialog.vue'));
const videosComponent = defineAsyncComponent(() => import('src/components/search/SearchDialog.vue'));

export default defineComponent({
  name: 'AppLayout',

  setup() {
    const $q = useQuasar();

    const { subscribe, unsubscribe } = useModels();
    const { state } = useSession();

    const sessionKey = computed(() => state.token || +new Date());

    const tagsDialog = () => $q.dialog({ component: tagsComponent });
    const videosDialog = () => $q.dialog({ component: videosComponent });

    tryOnBeforeUnmount(() => unsubscribe());
    tryOnMounted(() => subscribe(), true);

    return {
      sessionKey,
      tagsDialog,
      videosDialog,
    };
  },
});
</script>
