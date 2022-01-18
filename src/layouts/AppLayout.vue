<template>
  <q-layout
    :key="sessionKey"
    view="hHh lpR fFf"
  >
    <div class="header" />

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
