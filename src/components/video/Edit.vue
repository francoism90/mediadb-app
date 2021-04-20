<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card
      class="bg-grey-10 q-pa-md q-dialog-plugin"
      style="width: 400px; max-width: 100vw;"
      square
    >
      <q-form
        ref="formRef"
        @submit="onSubmit"
      >
        <q-card-section>
          <div class="text-h4 ellipsis">
            Edit Video
          </div>
        </q-card-section>

        <q-separator color="grey-8" />

        <q-card-section class="q-gutter-sm">
          <q-input
            v-model.trim="form.name"
            :error-message="getError('name')[0]"
            :error="hasError('name')"
            :maxlength="255"
            autofocus
            counter
            label="Title"
            type="text"
          />

          <tag-input
            v-model:tags="form.tags"
            :error-message="getError('tags')[0]"
            :error="hasError('tags')"
            :max-values="15"
            counter
            hide-dropdown-icon
            label="Tags"
            multiple
            stack-label
            use-chips
            use-input
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="primary"
            label="Save Changes"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { AxiosError } from 'axios'
import { useDialogPluginComponent } from 'quasar'
import TagInput from 'src/components/form/TagInput.vue'
import useFormValidation from 'src/composables/useFormValidation'
import { ValidationResponse } from 'src/interfaces/form'
import { Video } from 'src/interfaces/video'
import { update } from 'src/repositories/video'
import { defineComponent, PropType, reactive, ref } from 'vue'

export default defineComponent({
  name: 'VideoEdit',
  components: { TagInput },

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
      overview: props.video.overview || '',
      tags: props.video.tags || []
    })

    const { getError, hasError, setResponse } = useFormValidation()

    const onSubmit = async (): Promise<void> => {
      try {
        await update(form)
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
      onDialogCancel
    }
  }
})
</script>
