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

          <q-select
            v-model="form.tags"
            :error-message="getError('tags')[0]"
            :error="hasError('tags')"
            :input-debounce="500"
            :options="tags"
            :max-values="15"
            counter
            hide-dropdown-icon
            label="Tags"
            multiple
            option-label="name"
            option-value="id"
            stack-label
            use-chips
            use-input
            @filter="filterTags"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label>
                    {{ scope.opt.name }}
                  </q-item-label>

                  <q-item-label
                    caption
                    class="text-capitalize"
                  >
                    {{ scope.opt.type }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>
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
import useFormValidation from 'src/composables/useFormValidation'
import useTags from 'src/composables/useTags'
import { ValidationResponse } from 'src/interfaces/form'
import { TagsParameters } from 'src/interfaces/tag'
import { Video } from 'src/interfaces/video'
import { update } from 'src/repositories/video'
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
      overview: props.video.overview || '',
      tags: props.video.tags || []
    })

    const { getError, hasError, setResponse } = useFormValidation()

    const { filterTags, data: tags } = useTags({
      module: 'model-tags',
      params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 }
    })

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
      tags,
      filterTags,
      onSubmit,
      dialogRef,
      onDialogHide,
      onCancelClick: onDialogCancel
    }
  }
})
</script>
