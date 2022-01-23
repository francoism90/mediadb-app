<template>
  <q-layout
    :key="sessionKey"
    view="hhh lpR fff"
  >
    <q-header
      class="header container transparent"
    >
      <q-toolbar>
        <q-space />

        <q-btn-group
          class="header-navigation"
          unelevated
        >
          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="o_video_library"
            :to="{ name: 'home' }"
          />

          <q-separator vertical />

          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="o_tag"
            @click="toggleDialog"
          />

          <q-separator vertical />

          <q-btn
            class="q-pa-sm"
            color="grey-10"
            :icon="iconMode"
            @click="toggleDarkMode"
          />

          <q-separator vertical />

          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="o_logout"
            :to="{ name: 'logout' }"
          />
        </q-btn-group>
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useDarkMode } from 'src/composables/useDarkMode';
import { useSession } from 'src/composables/useSession';
import { computed, defineAsyncComponent, defineComponent, onBeforeMount, onBeforeUnmount, onMounted } from 'vue';

const tagComponent = defineAsyncComponent(() => import('components/tags/TagDialog.vue'));

export default defineComponent({
  name: 'AppLayout',

  setup() {
    const $q = useQuasar();
    const { store, subscribe, unsubscribe, getItem, setItem } = useSession();
    const { getMode, setMode, toggleMode } = useDarkMode();

    const sessionKey = computed(() => store.token || +new Date());
    const darkMode = computed(() => <boolean>getItem('dark_mode', false));
    const iconMode = computed(() => (getMode() ? 'dark_mode' : 'o_dark_mode'));

    const toggleDialog = () => $q.dialog({ component: tagComponent });

    const toggleDarkMode = () => {
      // Store mode
      setItem('dark_mode', !getMode());

      // Toggle mode change
      toggleMode();
    };

    onBeforeMount(() => setMode(darkMode.value));
    onBeforeUnmount(() => unsubscribe());
    onMounted(() => subscribe());

    return {
      sessionKey,
      iconMode,
      toggleDialog,
      toggleDarkMode,
    };
  },
});
</script>
