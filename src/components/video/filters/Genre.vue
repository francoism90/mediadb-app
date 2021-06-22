<template>
  <q-item-label
    header
    class="q-py-sm text-weight-medium"
  >
    Genres
  </q-item-label>

  <q-item>
    <q-item-section>
      <tag-input
        v-model="tags"
        :max-values="15"
        counter
        hide-dropdown-icon
        label="Tags"
        multiple
        stack-label
        use-chips
        use-input
      />
    </q-item-section>
  </q-item>

  <q-separator spaced />
</template>

<script lang="ts">
import useTags from 'src/composables/useTags';
import { Tag, TagsParameters } from 'src/interfaces/tag';
import useRepository from 'src/composables/useRepository';
import useRepositoryGetters from 'src/composables/useRepositoryGetters';
import { VideosParameters } from 'src/interfaces/video';
import {
  defineComponent, computed,
} from 'vue';

export default defineComponent({
  name: 'FilterType',

  setup() {
    const { filterTags, data } = useTags({
      module: 'tag-input',
      params: <TagsParameters>{ sort: 'recommended', 'page[number]': 1, 'page[size]': 5 },
    });

    const { setParams } = useRepository({ module: 'videos' });
    const { getValue } = useRepositoryGetters('videos');

    const setModuleParams = async (params: VideosParameters): Promise<void> => {
      await setParams({ params, reset: true });
    };

    const tags = computed({
      get: () => getParam('tags') as Tag[],
      set: (value) => setModuleParams({ sort: value }),
    });

    return {
      filterTags,
      data,
      tags,
    };
  },
});
</script>
