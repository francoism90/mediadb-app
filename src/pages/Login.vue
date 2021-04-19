<template>
  <q-page class="container fluid">
    <template v-if="token">
      already logged
    </template>

    <template v-else>
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

          <q-separator />

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
              no-caps
              unelevated
              rounded
              type="submit"
              label="Sign In"
            />
          </q-card-actions>
        </q-form>
      </q-card>
    </template>
  </q-page>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { useQuasar } from 'quasar'
import useFormValidation from 'src/composables/useFormValidation'
import { ValidationResponse } from 'src/interfaces/form'
import { LoginUser } from 'src/interfaces/session'
import { loginUser } from 'src/repositories/user'
import { router } from 'src/router'
import { setCsrfCookie } from 'src/services/api'
import { defineComponent, reactive, ref } from 'vue'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const { redirectPath } = useNamespacedGetters('session', ['redirectPath'])
    const { setToken } = useNamespacedActions('session', ['setToken'])
    const { token } = useNamespacedState('session', ['token'])

    const $q = useQuasar()
    const $router = router

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<LoginUser>({
      email: '',
      password: '',
      device_name: $q.platform.userAgent || '',
      remember_me: true
    })

    const { getError, hasError, setResponse } = useFormValidation()

    const onSubmit = async (): Promise<void> => {
      try {
        // CSRF is only useful on PWA/SPA
        if (!$q.platform.is.cordova && !$q.platform.is.capacitor) {
          await setCsrfCookie()
        }

        const response = await loginUser(form)

        await setToken(response)

        await $router.push(redirectPath.value)
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>

        if (error.response) {
          setResponse(error.response.data)
          return
        }

        throw error
      }
    }

    return {
      getError,
      hasError,
      formRef,
      form,
      onSubmit,
      token
    }
  }
})
</script>
