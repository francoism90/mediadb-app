<template>
  <q-item-label header>
    Filters
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-input
        v-model="query"
        bg-color="grey-8"
        color="grey-5"
        debounce="600"
        input-class="text-caption"
        placeholder="Filter items"
        type="text"
        clearable
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
import { VideosParameters } from 'src/interfaces/video';
import {
  computed, defineComponent,
} from 'vue';

export default defineComponent({
  name: 'VideoQuery',

  setup() {
    const { setParams } = useRepository({ module: 'videos' });
    const { getParam } = useRepositoryGetters('videos');

    const setModuleParams = async (params: VideosParameters): Promise<void> => {
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
