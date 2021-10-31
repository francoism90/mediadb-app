<template>
  <q-page />
</template>

<script lang="ts">
import { destroy } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserLogout',

  async preFetch({ redirect }) {
    try {
      await destroy({ redirectUri: '/' }, true);
    } catch {
      //
    }

    redirect({ name: 'login' });
  },
});
</script>
