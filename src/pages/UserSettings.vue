<template>
  <q-page>
    Settings
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { check } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserSettings',

  async preFetch({ redirect, urlPath }) {
    const authenticated = await check({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ name: 'login' });
    }
  },

  setup() {
    useMeta(() => ({ title: 'Settings' }));
  },
});
</script>
