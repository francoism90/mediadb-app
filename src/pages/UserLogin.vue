<template>
  <q-page class="fullscreen flex flex-center">
    <div class="container auth">
      <div class="hero q-mb-md">
        <h1>Sign In</h1>
        <p>
          <span>Login to your account</span>
        </p>
      </div>

      <q-card class="auth-form">
        <q-form
          class="q-pa-md"
          @submit="onSubmit"
        >
          <q-card-section class="q-gutter-sm">
            <q-input
              v-model.trim="form.email"
              :error-message="getError('email')?.find(Boolean)"
              :error="hasError('email')"
              autofocus
              class="input input-text"
              label="Your email"
              type="email"
            />

            <q-input
              v-model.trim="form.password"
              :error-message="getError('password')?.find(Boolean)"
              :error="hasError('password')"
              class="input input-text"
              label="Your password"
              type="password"
            />
          </q-card-section>

          <q-card-actions align="right">
            <q-btn
              type="submit"
              class="btn-submit"
              label="Sign In"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </div>
  </q-page>
</template>

<script lang="ts">
import { Platform, useMeta } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { useValidation } from 'src/composables/useValidation';
import { LoginRequest } from 'src/interfaces';
import { router } from 'src/router';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'UserLogin',

  setup() {
    const { authenticate } = useSession();
    const { getError, hasError, resetResponse, setResponse } = useValidation();

    const form = reactive<LoginRequest>({
      email: '',
      password: '',
      device_name: Platform.userAgent || '',
      remember: true,
    });

    const onSubmit = async (): Promise<void> => {
      resetResponse();

      const { error, data } = await authenticate(form);

      if (error.value) {
        setResponse(data.value);
        return;
      }

      await router.replace({ name: 'home' });
    };

    useMeta(() => ({ title: 'Log In' }));

    return {
      onSubmit,
      getError,
      hasError,
      form,
    };
  },
});
</script>
