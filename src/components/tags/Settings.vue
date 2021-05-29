<template>
  <q-item-label header>
    Lists
  </q-item-label>

  <q-item>
    <q-item-section>
      <q-checkbox
        v-model="favorites"
        :true-value="1"
        :false-value="null"
        label="Bookmarks"
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

    const favorites = computed({
      get: () => getParam('filter.favorites') as number,
      set: (value) => setModuleParams({ filter: { favorites: value } }),
    });

    return {
      favorites,
    };
  },
});
</script>
