<template>
  <q-layout
    :key="sessionKey"
    view="hHh lpR fFf"
  >
    <div
      class="header container transparent"
      reveal
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
            :icon="darkMode"
            @click="toggleMode"
          />

          <q-separator vertical />

          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="o_shuffle"
          />
        </q-btn-group>
      </q-toolbar>
    </div>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script lang="ts">
import { useQuasar } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  name: 'AppLayout',

  setup() {
    const $q = useQuasar();
    const { store, subscribe, unsubscribe } = useSession();
    const sessionKey = computed(() => store.token || +new Date());

    const darkMode = computed(() => ($q.dark.isActive ? 'dark_mode' : 'o_dark_mode'));

    const toggleMode = () => $q.dark.toggle();

    onMounted(() => subscribe());
    onBeforeUnmount(() => unsubscribe());

    return {
      sessionKey,
      darkMode,
      toggleMode,
    };
  },
});
</script>
