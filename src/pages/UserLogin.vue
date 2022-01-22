<template>
  <q-page class="fullscreen q-pa-md flex flex-center">
    <div>
      <page-hero class="q-mb-md">
        Sign In
      </page-hero>

      <q-card
        class="auth-card"
        style="width: 400px; max-width: 100vw;"
        flat
        square
      >
        <q-form @submit="onSubmit">
          <q-card-section class="q-px-xl">
            <q-input
              v-model.trim="state.email"
              :error-message="getError('email')?.find(Boolean)"
              :error="hasError('email')"
              autofocus
              label="Your email"
              type="email"
            />

            <q-input
              v-model.trim="state.password"
              :error-message="getError('password')?.find(Boolean)"
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
              flat
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
import { LoginRequest, ValidationError } from 'src/interfaces';
import { router } from 'src/router';
import { check } from 'src/services/auth';
import { defineAsyncComponent, defineComponent, reactive } from 'vue';

export default defineComponent({
  name: 'UserLogin',

  async preFetch({ redirect }) {
    const authenticated = await check();

    if (authenticated) {
      redirect({ name: 'home' });
    }
  },

  components: {
    PageHero: defineAsyncComponent(() => import('components/ui/PageHero.vue')),
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
        const error = e as ValidationError;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    useMeta(() => ({ title: 'Log In' }));

    return {
      state,
      onSubmit,
      getError,
      hasError,
    };
  },
});
</script>
