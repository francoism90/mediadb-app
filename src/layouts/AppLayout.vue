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

        <div class="q-gutter-x-none">
          <q-btn
            class="btn-primary transparent q-pa-sm"
            icon="o_video_library"
            size="14px"
            :to="{ name: 'home' }"
          />

          <q-btn
            class="btn-primary transparent q-pa-sm"
            icon="o_tag"
            size="14px"
            @click="toggleDialog"
          />

          <q-btn
            class="btn-primary transparent q-pa-sm"
            icon="o_logout"
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
