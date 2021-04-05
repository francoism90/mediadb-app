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

        <q-btn
          label="Submit"
          type="submit"
        />
      </q-form>
    </q-card>
  </q-page>
</template>

<script lang="ts">
import { ApiValidationResponse } from 'src/interfaces/api'
import { AxiosError } from 'axios'
import { defineComponent, reactive, ref } from 'vue'
import { loginUser } from 'src/services/auth'
import { PostLoginForm } from 'src/interfaces/session'
import { useQuasar } from 'quasar'
import useFormValidation from 'src/composables/useFormValidation'

export default defineComponent({
  name: 'LoginPage',

  setup () {
    const $q = useQuasar()

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
        await loginUser(form)
      } catch (e: unknown) {
        const error = e as AxiosError<ApiValidationResponse>

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
  }
})
</script>
