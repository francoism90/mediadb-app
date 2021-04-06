<template>
  <q-page class="container fluid">
    <q-card
      style="width: 400px; max-width: 100vw;"
      dark
    >
      <q-form
        greedy
        @submit="onSubmit"
      >
        <q-input
          v-model="form.email"
          dark
          filled
          label="Your email"
          type="email"
        />

        <q-input
          v-model="form.password"
          dark
          filled
          label="Your password"
          type="password"
        />

        <q-btn
          label="Submit"
          type="submit"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { defineComponent, reactive, ref } from 'vue'
import { loginUser, setCsrfCookie } from 'src/services/auth'
import { PostLoginForm } from 'src/interfaces/session'
import { router } from 'src/router'
import { useQuasar } from 'quasar'
import { useStore } from 'src/store'
import { ValidationResponse } from 'src/interfaces/response'
import useFormValidation from 'src/composables/useFormValidation'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const $q = useQuasar()
    const $router = router
    const $store = useStore()

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<PostLoginForm>({
      email: '',
      password: '',
      deviceName: $q.platform.userAgent,
      remember: true
    })

    const { getError, setResponse } = useFormValidation()

    const onSubmit = async () => {
      try {
        if (!$q.platform.is.cordova && !$q.platform.is.capacitor) {
          await setCsrfCookie()
        }

        const response = await loginUser(form)

        await $store.dispatch('session/setToken', response)
        await $router.push('/')
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>

        if (error.response) {
          setResponse(error.response.data)

          console.log(getError('email'))

          return
        }

        throw error
      }
    }

    return {
      formRef,
      form,
      onSubmit
    }
  },

  computed: {
    // mix the getters into computed with object spread operator
    ...mapGetters([
      'doneTodosCount',
      'anotherGetter'
      // ...
    ])
  }
})
</script>
