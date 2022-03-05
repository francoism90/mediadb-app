<template>
  <q-page>
    Settings
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserSettings',

  async preFetch({ redirect, urlPath }) {
    const { check } = useSession();
    const { error } = await check();

    if (error.value) {
      redirect({ name: 'login', query: { redirect: urlPath } });
    }
  },

  setup() {
    useMeta(() => ({ title: 'Settings' }));
  },
});
</script>
