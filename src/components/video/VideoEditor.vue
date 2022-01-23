<template>
  <q-dialog
    ref="dialogRef"
    square
    @hide="onDialogHide"
  >
    <q-card
      v-if="state?.id"
      flat
      square
      class="q-dialog-plugin dialog q-pa-md scroll"
      style="width: 500px; max-width: 100vw;"
    >
      <q-dialog
        v-model="deleteDialog"
        persistent
      >
        <q-card
          class="dialog"
          :dark="false"
          flat
          square
        >
          <q-card-section class="q-pt-lg q-px-xl text-body1">
            Are you sure you want to delete this video?
          </q-card-section>

          <q-card-actions
            align="center"
            class="q-pb-lg"
          >
            <q-btn
              v-close-popup
              flat
              label="Cancel"
            />

            <q-btn
              v-close-popup="3"
              flat
              color="primary"
              label="Confirm"
              @click="onDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-form @submit="onSubmit">
        <q-card-section class="q-gutter-md">
          <q-input
            v-model.trim="state.name"
            :dark="false"
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
            :dark="false"
            :error-message="getError('tags')?.find(Boolean)"
            :error="hasError('tags')"
            :options="tags"
            :options-dark="false"
            counter
            popup-content-class="dialog-popup"
            display-value="name"
            dropdown-icon="expand_more"
            label="Tags"
            max-values="15"
            multiple
            option-label="name"
            square
            use-chips
            use-input
            @filter="onTagsFilter"
          >
            <template #option="scope">
              <q-item v-bind="scope.itemProps">
                <q-item-section>
                  <q-item-label class="text-weight-medium">
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
            :dark="false"
            :error-message="getError('episode_number')?.find(Boolean)"
            :error="hasError('episode_number')"
            :maxlength="255"
            counter
            label="Episode"
            type="text"
          />

          <q-input
            v-model.trim="state.season_number"
            :dark="false"
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
            flat
            @click="deleteDialog = true"
          />

          <q-btn
            color="primary"
            flat
            label="Save Changes"
            @click="onSubmit"
          />
        </q-card-actions>
      </q-form>
    </q-card>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
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

    const state = reactive(<VideoModel>{});
    const deleteDialog = ref<boolean>(false);

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onTagsFilter = async (val: string, update: Function) => {
      await fetchTags({
        query: val,
        sort: val.length < 1 ? 'items:desc' : null,
        size: 5,
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

    const onSubmit = async () => {
      resetResponse();

      try {
        await save(state.id, state);
      } catch (e: unknown) {
        const error = e as ValidationError;

        if (error.response) {
          setResponse(error.response.data);
          return;
        }

        throw error;
      }
    };

    const onDelete = async () => {
      resetResponse();

      try {
        await destroy(state.id);
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
