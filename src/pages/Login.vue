<template>
  <q-page class="container fluid">
    <q-card
      style="width: 400px; max-width: 100vw;"
      dark
    >
      <q-form
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
import { defineComponent, reactive, ref } from 'vue'
import { useQuasar } from 'quasar'
import { PostLoginForm } from 'src/interfaces/session'
import { loginUser } from 'src/services/auth'
import { AxiosError } from 'axios'
import { FormResponse } from 'src/interfaces/form'

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

    const onSubmit = async () => {
      try {
        await loginUser(form)
      } catch (e: unknown) {
        const error = e as AxiosError<FormResponse>

        if (error.response) {
          console.log(error.message)

          return
        }

        // if (e && e.response) {
        //   console.log(e.response)
        // }

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
