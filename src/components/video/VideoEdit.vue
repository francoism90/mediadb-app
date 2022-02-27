<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    {{ form }}
    <q-card
      v-if="form?.id"
      class="q-dialog-plugin dialog"
    >
      <q-dialog v-model="deleteDialog">
        <q-card class="dialog dialog-popup">
          <q-card-section class="q-pa-sm text-center text-body1">
            Are you sure you want to delete this video?
          </q-card-section>

          <q-card-actions align="center">
            <q-btn
              v-close-popup
              class="btn-secondary"
              label="Cancel"
            />

            <q-btn
              v-close-popup="3"
              class="btn-submit"
              label="Confirm"
              @click="onDelete"
            />
          </q-card-actions>
        </q-card>
      </q-dialog>

      <q-form @submit="onSubmit">
        <q-card-section class="q-gutter-sm">
          <q-input
            v-model.trim="form.name"
            :error-message="getError('name')?.find(Boolean)"
            :error="hasError('name')"
            :maxlength="255"
            autofocus
            counter
            class="input input-text"
            label="Title"
            type="text"
          />

          <q-select
            v-model.lazy="form.tags"
            :error-message="getError('tags')?.find(Boolean)"
            :error="hasError('tags')"
            :options="tags"
            :options-dark="false"
            counter
            class="input input-text"
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
                <q-item-section class="tag-select">
                  <q-item-label class="tag-select-title text-weight-medium">
                    {{ scope.opt.name }}
                  </q-item-label>

                  <q-item-label
                    caption
                    class="tag-select-meta text-capitalize"
                  >
                    {{ scope.opt.type }}
                  </q-item-label>
                </q-item-section>
              </q-item>
            </template>
          </q-select>

          <q-input
            v-model.trim="form.episode_number"
            :error-message="getError('episode_number')?.find(Boolean)"
            :error="hasError('episode_number')"
            :maxlength="255"
            counter
            class="input input-text"
            label="Episode"
            type="text"
          />

          <q-input
            v-model.trim="form.season_number"
            :error-message="getError('season_number')?.find(Boolean)"
            :error="hasError('season_number')"
            :maxlength="255"
            counter
            class="input input-text"
            label="Season"
            type="text"
          />
        </q-card-section>

        <q-card-actions align="right">
          <q-btn
            class="btn-secondary"
            label="Delete"
            flat
            @click="deleteDialog = true"
          />

          <q-btn
            type="submit"
            class="btn-submit"
            label="Save Changes"
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
import { ValidationResponse, VideoModel } from 'src/interfaces';
import { defineComponent, ref, watch } from 'vue';

export default defineComponent({
  name: 'VideoEdit',

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
    const form = ref<VideoModel>();
    const deleteDialog = ref<boolean>(false);

    const { dialogRef, onDialogHide, onDialogCancel } = useDialogPluginComponent();
    const { getError, hasError, resetResponse, setResponse } = useValidation();
    const { fetch, save, destroy, state } = useVideo();
    const { state: tags, fetch: fetchTags } = useTagInput();

    const initialize = async (id: string) => {
      // Refetch state
      await fetch(id);

      // Populate form
      form.value = { ...state.data };
    };

    // eslint-disable-next-line @typescript-eslint/ban-types
    const onTagsFilter = async (val: string, update: Function) => {
      await fetchTags({
        query: val,
        sort: val.length < 1 ? 'items:desc' : null,
        size: 5,
      });

      await update();
    };

    const onSubmit = async () => {
      resetResponse();

      if (typeof form.value?.id === 'string') {
        await save(state.data?.id || '', form.value);

        setResponse(state.error as ValidationResponse);
      }
    };

    const onDelete = async () => {
      await destroy(state.data?.id || '');
    };

    watch(() => props.id, async (value) => initialize(value), { immediate: true });

    return {
      getError,
      hasError,
      onDelete,
      onSubmit,
      onTagsFilter,
      onDialogHide,
      onDialogCancel,
      form,
      tags,
      deleteDialog,
      dialogRef,
    };
  },
});
</script>
