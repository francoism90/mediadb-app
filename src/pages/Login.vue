<template>
  <q-page class="container fluid">
    <q-card
      class="bg-grey-10 fixed-center"
      style="width: 400px; max-width: 100vw;"
      square
    >
      <q-form
        ref="formRef"
        @submit="onSubmit"
      >
        <q-card-section class="row no-wrap justify-between items-center content-center">
          <div class="col text-h6 ellipsis">
            Sign In to MediaDB
          </div>
        </q-card-section>

        <q-separator :dark="false" />

        <q-card-section class="q-px-xl q-gutter-sm">
          <q-input
            v-model.trim="form.email"
            :error-message="getError('email')[0]"
            :error="hasError('email')"
            autofocus
            label="Your email"
            type="email"
          />

          <q-input
            v-model.trim="form.password"
            :error-message="getError('password')[0]"
            :error="hasError('password')"
            label="Your password"
            type="password"
          />
        </q-card-section>

        <q-card-actions
          align="center"
          class="q-pb-lg"
        >
          <q-btn
            color="primary"
            type="submit"
            label="Sign In"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { AxiosError } from 'axios';
import { useQuasar } from 'quasar';
import useFormValidation from 'src/composables/useFormValidation';
import useSession from 'src/composables/useSession';
import { ValidationResponse } from 'src/interfaces/form';
import { LoginUser } from 'src/interfaces/session';
import { login } from 'src/repositories/user';
import { router } from 'src/router';
import { setCsrfCookie } from 'src/services/api';
import { defineComponent, reactive, ref } from 'vue';

export default defineComponent({
  name: 'LoginPage',

  setup() {
    const $q = useQuasar();

    const { redirectPath, initialize } = useSession();

    const formRef = ref<HTMLFormElement | null>(null);
    const form = reactive<LoginUser>({
      email: '',
      password: '',
      device_name: $q.platform.userAgent || '',
      remember_me: true,
    });

    const { getError, hasError, setResponse } = useFormValidation();

    const onSubmit = async (): Promise<void> => {
      try {
        // CSRF is only useful on SPA
        if (!$q.platform.is.capacitor && !$q.platform.is.cordova) {
          await setCsrfCookie();
        }

        const response = await login(form);
        await initialize(response);

        await router.push(redirectPath.value || '/');
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    return {
      getError,
      hasError,
      formRef,
      form,
      onSubmit,
    };
  },
});
</script>
