import { RepositoryQuery, TagModel } from 'src/interfaces';
import { all } from 'src/services/api';
import { reactive } from 'vue';

const state = reactive<TagModel[]>([]);

export const useTagInput = () => {
  const fetch = async (params: RepositoryQuery) => {
    const response = await all('tags', params);

    state.push(...<TagModel[]>response.data);
  };

  return {
    state,
    fetch,
  };
};
