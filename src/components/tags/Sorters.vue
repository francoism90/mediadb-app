<template>
  <q-item-label header>
    Sort by
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-select
        v-model="sorter"
        :options="sorters"
        class="text-caption full-width"
        input-class="text-grey-5"
        bg-color="grey-8"
        dropdown-icon="expand_more"
        options-selected-class="text-white"
        popup-content-class="popup"
        emit-value
        map-options
        dense
        filled
        square
      >
        <template #option="{ itemProps, opt, selected }">
          <q-item
            v-bind="itemProps"
            dense
          >
            <q-item-section>
              <q-item-label>{{ opt.label }}</q-item-label>
            </q-item-section>

            <q-item-section
              v-if="selected"
              side
            >
              <q-icon name="check" />
            </q-item-section>
          </q-item>
        </template>
      </q-select>
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { TagsParameters } from 'src/interfaces/tag';
import {
  defineComponent, computed,
} from 'vue';

const sorters = [
  {
    label: 'Alphabetical',
    value: 'name',
  },
  {
    label: 'Random',
    value: 'random',
  },
  {
    label: 'Items',
    value: '-items',
  },
];

export default defineComponent({
  name: 'TagSorter',

  setup() {
    const { setParams } = useRepository({ module: 'tags' });
    const { getParam } = useRepositoryGetters('tags');

    const setModuleParams = async (params: TagsParameters): Promise<void> => {
      await setParams({ params, reset: true });
    };

    const sorter = computed({
      get: () => getParam('sort') as string,
      set: (value) => setModuleParams({ sort: value }),
    });

    return {
      sorters,
      sorter,
    };
  },
});
</script>
