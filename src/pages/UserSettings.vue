<template>
  <q-page>
    Settings
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'UserSettings',

  async preFetch({ redirect }) {
    const { check } = useSession();
    const { error } = await check();

    if (error.value) {
      redirect({ name: 'login' });
    }
  },

  setup() {
    useMeta(() => ({ title: 'Settings' }));
  },
});
</script>
