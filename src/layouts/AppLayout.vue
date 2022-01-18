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

        <q-btn-group unelevated>
          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="video_library"
            :to="{ name: 'home' }"
          />

          <q-separator vertical />

          <q-btn
            class="q-pa-sm"
            color="grey-10"
            icon="shuffle"
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
import { useSession } from 'src/composables/useSession';
import { computed, defineComponent, onBeforeUnmount, onMounted } from 'vue';

export default defineComponent({
  name: 'AppLayout',

  setup() {
    const { store, subscribe, unsubscribe } = useSession();
    const sessionKey = computed(() => store.token || +new Date());

    onMounted(() => subscribe());
    onBeforeUnmount(() => unsubscribe());

    return {
      sessionKey,
    };
  },
});
</script>
