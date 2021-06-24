<template>
  <q-page />
</template>

<script lang="ts">
import useRouter from 'src/composables/useRouter';
import useSession from 'src/composables/useSession';
import { AuthUser } from 'src/interfaces/session';
import { signOut } from 'src/services/auth';
import { defineComponent, onMounted, reactive } from 'vue';

export default defineComponent({
  name: 'Logout',

  setup() {
    const { router } = useRouter();
    const { store } = useSession();

    const form = reactive<AuthUser>({
      token: store.token || '',
    });

    onMounted(async () => {
      try {
        await signOut(form);
      } catch {
        //
      } finally {
        await router.push({ name: 'home' });
      }
    });
  },
});
</script>
