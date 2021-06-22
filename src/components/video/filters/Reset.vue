<template>
  <q-item>
    <q-item-section>
      <q-item-label class="q-py-sm text-caption text-grey-5">
        Title Type
      </q-item-label>

      <q-item-label>
        <q-select
          v-model="sorter"
          :options="sorters"
          behavior="menu"
          bg-color="grey-8"
          class="full-width text-caption"
          dense
          dropdown-icon="expand_more"
          emit-value
          filled
          input-class="text-grey-5"
          label-color="grey-10"
          map-options
          options-dense
          options-selected-class="text-white"
          square
        />
      </q-item-label>
    </q-item-section>
  </q-item>

  <q-separator spaced />
</template>

<script lang="ts">
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { VideosParameters } from 'src/interfaces/video';
import {
  defineComponent, computed,
} from 'vue';

const sorters = [
  {
    label: 'Recommended',
    value: 'recommended',
  },
  {
    label: 'Trending',
    value: 'trending',
  },
  {
    label: 'Most Recent',
    value: '-created_at',
  },
  {
    label: 'Alphabetical',
    value: 'name',
  },
  {
    label: 'Longest',
    value: '-duration',
  },
  {
    label: 'Shortest',
    value: 'duration',
  },
];

export default defineComponent({
  name: 'VideoSorter',

  setup() {
    const { setParams } = useRepository({ module: 'videos' });
    const { getParam } = useRepositoryGetters('videos');

    const setModuleParams = async (params: VideosParameters): Promise<void> => {
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
