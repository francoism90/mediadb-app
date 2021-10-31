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
            v-model.trim="state.email"
            :error-message="getError('email')[0]"
            :error="hasError('email')"
            autofocus
            label="Your email"
            type="email"
          />

          <q-input
            v-model.trim="state.password"
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
import { Platform, useMeta } from 'quasar';
import { useSession } from 'src/composables/useSession';
import { useValidation } from 'src/composables/useValidation';
import { LoginRequest, ValidationResponse } from 'src/interfaces';
import { router } from 'src/router';
import { check } from 'src/services/auth';
import { defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'UserLogin',

  async preFetch({ redirect }) {
    const authenticated = await check();

    if (authenticated) {
      redirect({ name: 'home' });
    }
  },

  setup() {
    const { signIn, store } = useSession();
    const { getError, hasError, resetResponse, setResponse } = useValidation();

    const state = reactive<LoginRequest>({
      email: '',
      password: '',
      device_name: Platform.userAgent || '',
      remember: true,
    });

    const onSubmit = async (): Promise<void> => {
      resetResponse();

      try {
        await signIn(state);

        await router.replace(store.redirectUri);
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    useMeta(() => ({ title: 'Log In' }));

    return {
      onSubmit,
      getError,
      hasError,
      state,
    };
  },
});
</script>
