import { RepositoryQuery, TagModel } from 'src/interfaces';
import { all } from 'src/services/api';
import { reactive, toRefs } from 'vue';

type tags = TagModel[] | undefined

const state = reactive({
  collection: <tags>[],
  filtered: <tags>[],
  selected: <tags>[],
});

export const useTagInput = () => {
  const fetch = async (params: RepositoryQuery): Promise<void> => {
    const response = await all('tags', params);

    Object.assign(state.collection, { ...state.collection, ...response.data });
    Object.assign(state.filtered, response.data);
  };

  return {
    state: toRefs(state),
    fetch,
  };
};
