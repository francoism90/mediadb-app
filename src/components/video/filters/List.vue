<template>
  <q-item-label
    header
    class="q-py-sm text-weight-medium"
  >
    Filter Content
  </q-item-label>

  <q-item
    dense
    tag="label"
  >
    <q-item-section>
      <q-item-label>Bookmarks</q-item-label>
    </q-item-section>

    <q-item-section side>
      <q-toggle
        v-model="favorites"
        :true-value="1"
        :false-value="null"
      />
    </q-item-section>
  </q-item>

  <q-separator spaced />
</template>

<script lang="ts">
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { VideosParameters } from 'src/interfaces/video';
import {
  computed, defineComponent,
} from 'vue';

export default defineComponent({
  name: 'VideoSettings',

  setup() {
    const { setParams } = useRepository({ module: 'videos' });
    const { getParam } = useRepositoryGetters('videos');

    const setModuleParams = async (params: VideosParameters): Promise<void> => {
      await setParams({ params, reset: true });
    };

    const favorites = computed({
      get: () => getParam('filter[favorites]') as number,
      set: (value) => setModuleParams({ 'filter[favorites]': value }),
    });

    return {
      favorites,
    };
  },
});
</script>
