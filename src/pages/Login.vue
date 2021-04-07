<template>
  <q-page class="container fluid">
    <template v-if="token">
      already logged
    </template>

    <template v-else>
      <q-card
        class="bg-grey-10 fixed-center"
        style="width: 400px; max-width: 100vw;"
        dark
        square
      >
        <q-form
          greedy
          @submit="onSubmit"
        >
          <q-card-section class="row no-wrap justify-between items-center content-center">
            <div class="col text-h6 ellipsis">
              Sign In to MediaDB
            </div>
          </q-card-section>

          <q-separator dark />

          <q-card-section class="q-px-xl q-gutter-sm">
            <q-input
              v-model="form.email"
              autofocus
              dark
              label="Your email"
              type="email"
            />

            <q-input
              v-model="form.password"
              dark
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
              class="btn-outline btn-primary"
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
import { defineComponent, reactive, ref } from 'vue'
import { loginUser, setCsrfCookie } from 'src/services/auth'
import { PostLoginForm } from 'src/interfaces/session'
import { router } from 'src/router'
import { useNamespacedActions, useNamespacedGetters, useNamespacedState } from 'vuex-composition-helpers'
import { useQuasar } from 'quasar'
import { ValidationResponse } from 'src/interfaces/response'
import useFormValidation from 'src/composables/useFormValidation'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const $q = useQuasar()
    const $router = router

    const { redirectPath } = useNamespacedGetters('session', ['redirectPath'])
    const { setToken } = useNamespacedActions('session', ['setToken'])
    const { token } = useNamespacedState('session', ['token'])

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<PostLoginForm>({
      email: '',
      password: '',
      deviceName: $q.platform.userAgent,
      remember: true
    })

    const { getError, hasError, setResponse } = useFormValidation()

    const onSubmit = async () => {
      try {
        // CSRF is only useful on PWA/SPA
        if (!$q.platform.is.cordova && !$q.platform.is.capacitor) {
          await setCsrfCookie()
        }

        // Try to login
        const response = await loginUser(form)

        // Set (new) token
        await setToken(response)

        // Redirect to previous location or just '/'
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
