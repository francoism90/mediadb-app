<template>
  <q-page />
</template>

<script lang="ts">
import { signOut } from 'components/auth/logout';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'LogoutForm',

  async preFetch({ redirect }) {
    try {
      await signOut();
    } catch {
      //
    }

    redirect({ path: '/login' });
  },
});
</script>
