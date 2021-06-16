<template>
  <q-item-label header>
    Lists
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-option-group
        v-model="types"
        :options="options"
        type="checkbox"
        dense
      />
    </q-item-section>
  </q-item>
</template>

<script lang="ts">
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { TagsParameters } from 'src/interfaces/tag';
import {
  computed, defineComponent,
} from 'vue';

const options = [
  {
    label: 'Genre',
    value: 'genre',
  },
  {
    label: 'Actor',
    value: 'actor',
  },
  {
    label: 'Language',
    value: 'language',
  },
  {
    label: 'Studio',
    value: 'studio',
  },
];

export default defineComponent({
  name: 'TagSettings',

  setup() {
    const { setParams } = useRepository({ module: 'tags' });
    const { getParam } = useRepositoryGetters('tags');

    const setModuleParams = async (params: TagsParameters): Promise<void> => {
      await setParams({ params, reset: true });
    };

    const types = computed({
      get: () => getParam('type') as string | string[],
      set: (value) => setModuleParams({ type: value }),
    });

    return {
      options,
      types,
    };
  },
});
</script>
