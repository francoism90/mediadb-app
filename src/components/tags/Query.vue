<template>
  <q-item-label header>
    Filters
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-input
        v-model="query"
        bg-color="grey-8"
        clearable
        color="grey-5"
        debounce="600"
        input-class="text-caption"
        placeholder="Filter items"
        type="text"
        filled
        square
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

export default defineComponent({
  name: 'TagQuery',

  setup() {
    const { setParams } = useRepository({ module: 'tags' });
    const { getParam } = useRepositoryGetters('tags');

    const setModuleParams = async (params: TagsParameters): Promise<void> => {
      await setParams({ params, reset: true });
    };

    const query = computed({
      get: () => getParam('filter[query]') as string | null,
      set: (value) => setModuleParams({ 'filter[query]': value }),
    });

    return {
      query,
    };
  },
});
</script>
