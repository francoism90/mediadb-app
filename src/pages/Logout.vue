<template>
  <q-page />
</template>

<script lang="ts">
import useSession from 'src/composables/useSession';
import { logout } from 'src/repositories/user';
import { router } from 'src/router';
import { defineComponent, onMounted } from 'vue';

export default defineComponent({
  name: 'LogoutPage',

  setup() {
    const { resetStore, token } = useSession();

    const logOut = async (): Promise<void> => {
      try {
        await logout({ token: token.value || '' });
        await resetStore();
      } catch (e: unknown) {
        //
      }
    };

    onMounted(async () => {
      await logOut();
      await router.push({ name: 'home' });
    });
  },
});
</script>
