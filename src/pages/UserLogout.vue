<template>
  <q-page />
</template>

<script lang="ts">
import { destroy } from 'src/services/auth';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserLogout',

  async preFetch({ redirect }) {
    const { error } = await destroy();

    console.error(error.value);

    redirect({ name: 'login' });
  },
});
</script>
