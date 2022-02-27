import { TagModel, TagsParams } from 'src/interfaces';
import { all } from 'src/services/api';
import { readonly, ref } from 'vue';

const state = ref<TagModel[]>();

export const useTagInput = () => {
  const fetch = async (params: TagsParams) => {
    const response = await all('tags', params);

    state.value = <TagModel[]>response.data;
  };

  return {
    fetch,
    state: readonly(state),
  };
};
