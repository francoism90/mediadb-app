<template>
  <q-page>
    Settings
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { authenticate } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'Settings',

  async preFetch({ redirect, urlPath }) {
    const authenticated = await authenticate({ redirectUri: urlPath });

    if (!authenticated) {
      redirect({ path: '/login' });
    }
  },

  setup() {
    useMeta(() => ({
      title: 'Settings',
    }));
  },
});
</script>
