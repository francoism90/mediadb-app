<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <q-card
      class="bg-grey-12 q-pa-md q-dialog-plugin"
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

      <q-form @submit="onSubmit">
        <q-card-section>
          <div class="text-h4 ellipsis">
            Edit Video
          </div>
        </q-card-section>

        <q-separator color="grey-8" />

        <q-card-section class="q-gutter-sm">
          <q-input
            v-model.trim="state.name"
            :error-message="getError('name')?.find(Boolean)"
            :error="hasError('name')"
            :maxlength="255"
            autofocus
            counter
            label="Title"
            type="text"
          />

          <q-select
            v-model.lazy="state.tags"
            :options="tags"
            :error-message="getError('tags')?.find(Boolean)"
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
            @filter="onTagsFilter"
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
            v-model.trim="state.episode_number"
            :error-message="getError('episode_number')?.find(Boolean)"
            :error="hasError('episode_number')"
            :maxlength="255"
            counter
            label="Episode"
            type="text"
          />

          <q-input
            v-model.trim="state.season_number"
            :error-message="getError('season_number')?.find(Boolean)"
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
import { useDialogPluginComponent, useQuasar } from 'quasar';
import { useTagInput } from 'src/composables/useTagInput';
import { useValidation } from 'src/composables/useValidation';
import { useVideo } from 'src/composables/useVideo';
import { ValidationError, VideoModel } from 'src/interfaces';
import { defineComponent, reactive, ref, watch } from 'vue';

export default defineComponent({
  name: 'VideoEditor',

  props: {
    id: {
      type: String,
      required: true,
    },
  },

  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup(props) {
    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
    const { getError, hasError, resetResponse, setResponse } = useValidation();
    const { fetch, destroy, update: save } = useVideo();
    const { state: tags, fetch: fetchTags } = useTagInput();
    const $q = useQuasar();

    const state = reactive(<VideoModel>{});
    const deleteDialog = ref<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onTagsFilter = async (val: string, update: Function): Promise<void> => {
      await fetchTags({
        page: { number: 1, size: 5 },
        filter: { id: null, query: val },
        sort: val.length < 1 ? 'items' : 'relevance',
      });

      await update();
    };

    const initialize = async (id: string) => {
      resetResponse();

      try {
        const response = await fetch(id);

        Object.assign(state, response.data);
      } catch (e: unknown) {
        const error = e as ValidationError;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    const onSubmit = async (): Promise<void> => {
      resetResponse();

      try {
        await save(state.id, state);

        $q.notify({ type: 'positive', message: 'The video has been updated.' });
      } catch (e: unknown) {
        const error = e as ValidationError;

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
        await destroy(state.id);

        $q.notify({ type: 'positive', message: 'The video has been deleted.' });
      } catch (e: unknown) {
        const error = e as ValidationError;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    watch(() => props.id, async (value) => initialize(value), { immediate: true });

    return {
      state,
      tags,
      deleteDialog,
      dialogRef,
      getError,
      hasError,
      onDelete,
      onSubmit,
      onTagsFilter,
      onDialogHide,
      onDialogCancel,
    };
  },
});
</script>
