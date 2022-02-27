<template>
  <q-page />
</template>

<script lang="ts">
import { destroy, getToken } from 'src/services/auth';
import { defineComponent } from 'vue';

const redirectUri = '/';
const token = getToken();

export default defineComponent({
  name: 'UserLogout',

  async preFetch({ redirect }) {
    try {
      await destroy({ redirectUri, token }, true);
    } catch {
      //
    }

    redirect({ name: 'login' });
  },
});
</script>
