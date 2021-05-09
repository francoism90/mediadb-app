<template>
  <q-btn
    icon="filter_list"
    label="Filters"
    color="grey-5"
    outline
  >
    <q-menu
      anchor="top left"
      class="menu"
      self="top left"
      square
      transition-duration="0"
    >
      <q-list
        bordered
        padding
        style="width: 250px; max-width: 100vw;"
      >
        <q-item-label header>
          Sort By
        </q-item-label>

        <q-separator />

        <q-item
          v-for="(sorter, index) in sortList"
          :key="index"
          v-ripple
          dense
          tag="label"
        >
          <q-item-section avatar>
            <q-radio
              v-model="form.sort"
              :val="sorter.value"
              size="sm"
            />
          </q-item-section>

          <q-item-section>
            <q-item-label class="text-grey-4">
              {{ sorter.label }}
            </q-item-label>
          </q-item-section>
        </q-item>
      </q-list>
    </q-menu>
  </q-btn>
</template>

<script lang="ts">
import { debounce } from 'lodash';
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { VideosParameters } from 'src/interfaces/video';
import {
  defineComponent, PropType, reactive, watch,
} from 'vue';

const sortList = [
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
    label: 'Longest',
    value: '-duration',
  },
];

export default defineComponent({
  name: 'VideosFilter',

  props: {
    module: {
      type: String as PropType<string>,
      required: true,
    },
  },

  setup() {
    const { setParams: setModuleParams } = useRepository({ module: 'videos' });
    const { getParam: getModuleParam } = useRepositoryGetters('videos');

    const form = reactive<VideosParameters>({
      sort: getModuleParam('sort'),
    });

    const performQuery = async (): Promise<void> => {
      await setModuleParams({
        params: { ...form, ...{ 'page[number]': 1 } },
        reset: true,
      });
    };

    const setQuery = debounce(performQuery, 500);

    watch(form, setQuery);

    return {
      sortList,
      form,
    };
  },
});
</script>
