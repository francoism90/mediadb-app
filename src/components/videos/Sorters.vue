<template>
  <q-item-label header>
    Sort by
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-select
        v-model="sorter"
        :options="sorters"
        behavior="menu"
        bg-color="grey-8"
        class="text-caption full-width"
        dense
        dropdown-icon="expand_more"
        emit-value
        filled
        input-class="text-grey-5"
        map-options
        options-selected-class="text-white"
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
