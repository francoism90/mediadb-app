<template>
  <q-page class="container fluid">
    <login-form />
  </q-page>
</template>

<script lang="ts">
import { useMeta } from 'quasar';
import { defineAsyncComponent, defineComponent } from 'vue';

export default defineComponent({
  name: 'PageLogin',

  components: {
    LoginForm: defineAsyncComponent(() => import('components/auth/login/LoginForm.vue')),
  },

  setup() {
    useMeta(() => ({ title: 'Log In' }));
  },
});
</script>
