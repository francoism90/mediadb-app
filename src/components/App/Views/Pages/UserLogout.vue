<template>
  <q-page />
</template>

<script lang="ts">
import { authenticate, getToken, signOut } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserLogout',

  async preFetch({ redirect }) {
    const authenticated = await authenticate({ redirectUri: '/' });

    if (authenticated) {
      await signOut({ token: getToken() });
    }

    redirect({ path: '/login' });
  },
});
</script>
