<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card
      class="bg-grey-10  q-dialog-plugin"
      style="width: 400px; max-width: 100vw;"
      square
    >
      <q-form
        ref="formRef"
        @submit="onSubmit"
      >
        <!-- buttons example -->
        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="OK"
            @click="onOKClick"
          />
          <q-btn
            color="primary"
            label="Cancel"
            @click="onCancelClick"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { useDialogPluginComponent } from 'quasar'
import useFormValidation from 'src/composables/useFormValidation'
import { ValidationResponse } from 'src/interfaces/form'
import { Video, VideoUpdateForm } from 'src/interfaces/video'
import { defineComponent, PropType, reactive, ref } from 'vue'

export default defineComponent({
  name: 'VideoEdit',

  props: {
    video: {
      type: Object as PropType<Video>,
      required: true
    }
  },

  emits: [
    ...useDialogPluginComponent.emits
  ],

  setup (props) {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent()

    const formRef = ref<HTMLFormElement | null>(null)
    const form = reactive<Video>({
      id: props.video.id,
      name: props.video.name || '',
      overview: props.video.overview || ''
    })

    const { getError, hasError, setResponse } = useFormValidation()

    const onSubmit = async (): Promise<void> => {
      try {
        const response = await loginUser(form)
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
      dialogRef,
      onDialogHide,
      onCancelClick: onDialogCancel
    }
  }
})
</script>
