<template>
  <q-page />
</template>

<script lang="ts">
import { destroy, getToken } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserLogout',

  async preFetch({ redirect }) {
    try {
      const redirectUri = '/';
      const token = getToken() || '';

      await destroy({ redirectUri, token }, true);
    } catch {
      //
    }

    redirect({ name: 'login' });
  },
});
</script>
