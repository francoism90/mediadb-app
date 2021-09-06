<template>
  <q-dialog
    ref="dialogRef"
    @hide="onDialogHide"
  >
    <div class="filter-container scroll fit">
      <q-list
        dense
        class="filter-list"
      >
        <q-item-label
          header
          class="filter-search"
        >
          <q-input
            v-model.lazy="store.query.filter.query"
            autofocus
            borderless
            color="grey-10"
            clearable
            debounce="500"
            dense
            hide-bottom-space
            input-class="text-caption"
            placeholder="Search tags.."
            type="text"
          >
            <template #prepend>
              <q-icon name="search" />
            </template>
          </q-input>
        </q-item-label>

        <q-item-label
          header
          class="filter-header"
        >
          Filter By List
        </q-item-label>

        <q-item
          v-for="(list, index) in lists"
          :key="index"
          v-ripple
          tag="label"
        >
          <q-item-section side>
            <q-radio
              v-model.lazy="store.query.filter.type"
              :val="list.value"
            />
          </q-item-section>
          <q-item-section>{{ list.label }}</q-item-section>
        </q-item>

        <q-separator
          spaced
          class="transparent"
        />

        <q-item-label
          header
          class="filter-header"
        />

        <q-item>
          <q-item-label class="full-width">
            <q-btn
              class="q-my-sm q-py-sm full-width"
              color="grey-5"
              icon="restart_alt"
              label="Reset Filters"
              no-caps
              outline
              @click="resetFilters"
            />
          </q-item-label>
        </q-item>
      </q-list>
    </div>
  </q-dialog>
</template>

<script lang="ts">
import { useDialogPluginComponent } from 'quasar';
import useTags from 'src/composables/useTags';

const lists = [
  { label: 'Show All', value: null },
  { label: 'Actors', value: 'actor' },
  { label: 'Genres', value: 'genre' },
  { label: 'Languages', value: 'language' },
  { label: 'Studios', value: 'studio' },
];

export default {
  emits: [
    ...useDialogPluginComponent.emits,
  ],

  setup() {
    const { dialogRef, onDialogHide, onDialogOK } = useDialogPluginComponent();
    const { store } = useTags();

    const resetFilters = (): void => {
      store.$reset();
      window.setTimeout(() => onDialogOK(), 300);
    };

    return {
      onDialogHide,
      resetFilters,
      dialogRef,
      store,
      lists,
    };
  },
};
</script>
