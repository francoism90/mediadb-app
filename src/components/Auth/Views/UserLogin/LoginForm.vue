<template>
  <q-page class="container fluid">
    <q-card
      class="bg-grey-10 fixed-center"
      style="width: 400px; max-width: 100vw;"
      square
    >
      <q-form @submit="onSubmit">
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
import { LoginForm, signIn } from 'components/Auth/Views/UserLogin';
import { resetErrors, setErrors, ValidationResponse } from 'components/UIComponents/Forms';
import { useMeta, useQuasar } from 'quasar';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'LoginForm',

  setup() {
    const $q = useQuasar();

    const form = reactive<LoginForm>({
      email: '',
      password: '',
      device_name: $q.platform?.userAgent || '',
      remember: true,
    });

    const onSubmit = async (): Promise<void> => {
      resetErrors();

      try {
        await signIn(form);
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setErrors(error.response.data);
          return;
        }

        throw error;
      }
    };

    useMeta(() => ({ title: 'Log In' }));

    return {
      onSubmit,
      form,
    };
  },
});
</script>
