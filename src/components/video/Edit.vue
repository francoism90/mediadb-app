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
      <q-dialog
        v-model="deleteDialog"
        persistent
      >
        <q-card dark>
          <q-card-section class="q-pt-lg q-px-xl text-body1">
            Are you sure you want to delete this video?
          </q-card-section>

          <q-card-actions
            align="center"
            class="q-pb-lg"
          >
            <q-btn
              v-close-popup
              label="Cancel"
            />

            <q-btn
              v-close-popup="3"
              color="primary"
              label="Confirm"
              @click="onDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

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
            v-model.lazy="form.tags"
            :options="tags"
            :error-message="getError('tags')[0]"
            :error="hasError('tags')"
            counter
            display-value="name"
            dropdown-icon="expand_more"
            label="Tags"
            max-values="15"
            multiple
            option-label="name"
            popup-content-class="bg-grey-9"
            square
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

          <q-input
            v-model.trim="form.episode_number"
            :error-message="getError('episode_number')[0]"
            :error="hasError('episode_number')"
            :maxlength="255"
            counter
            label="Episode"
            type="text"
          />

          <q-input
            v-model.trim="form.season_number"
            :error-message="getError('season_number')[0]"
            :error="hasError('season_number')"
            :maxlength="255"
            counter
            label="Season"
            type="text"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            color="grey-8"
            label="Delete"
            @click="deleteDialog = true"
          />

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
import { AxiosError } from 'axios';
import { useDialogPluginComponent } from 'quasar';
import useFormValidation from 'src/composables/useFormValidation';
import useTagInput from 'src/composables/useTagInput';
import { ValidationResponse } from 'src/interfaces/form';
import { VideoModel } from 'src/interfaces/video';
import { remove, save } from 'src/repositories/video';
import {
  defineComponent, PropType, reactive, ref,
} from 'vue';

export default defineComponent({
  name: 'VideoEdit',

  props: {
    video: {
      type: Object as PropType<VideoModel>,
      required: true,
    },
  },

  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
    const {
      getError, hasError, resetResponse, setResponse,
    } = useFormValidation();
    const { fetch: fetchTags, reset: resetTags, data: tags } = useTagInput();

    const deleteDialog = ref<boolean>(false);
    const formRef = ref<HTMLFormElement | null>();

    const form = reactive<VideoModel>(<VideoModel>{
      id: props.video.id,
      name: props.video.name,
      season_number: props.video.season_number,
      episode_number: props.video.episode_number,
      overview: props.video.overview || '',
      tags: props.video.tags || [],
    });

    // eslint-disable-next-line @typescript-eslint/ban-types
    const filterTags = async (val: string, update: Function): Promise<void> => {
      resetTags();

      await fetchTags({
        filter: { query: val },
        page: { number: 1, size: 5 },
        sort: val.length < 1 ? 'items' : 'relevance',
      });

      await update();
    };

    const onSubmit = async (): Promise<void> => {
      resetResponse();

      try {
        await save(form);
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    const onDelete = async (): Promise<void> => {
      resetResponse();

      try {
        await remove(form);
      } catch (e: unknown) {
        const error = e as AxiosError<ValidationResponse>;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    return {
      filterTags,
      getError,
      hasError,
      onDelete,
      onSubmit,
      deleteDialog,
      formRef,
      form,
      tags,
      dialogRef,
      onDialogHide,
      onDialogCancel,
    };
  },
});
</script>
