import { RepositoryQuery, TagModel } from 'src/interfaces';
import { all } from 'src/services/api';
import { ref } from 'vue';

const state = ref<TagModel[]>([]);

export const useTagInput = () => {
  const fetch = async (params: RepositoryQuery) => {
    const response = await all('tags', params);

    state.value = <TagModel[]>response.data;
  };

  return {
    state,
    fetch,
  };
};
