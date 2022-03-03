import { stringify } from 'src/helpers';
import { RepositoryLinks, RepositoryMeta, TagsFilters, TagsResponse, TagsState } from 'src/interfaces';
import { api, uri } from 'src/services/api';
import { reactive } from 'vue';

const state = reactive(<TagsState>{
  id: null,
  data: [],
  meta: undefined,
  links: undefined,
  error: undefined,
  filters: undefined,
});

export const useTags = () => {
  const update = (payload: TagsResponse | null) => {
    state.data = state.data.concat(payload?.data || []);
    state.meta = { ...state.meta, ...<RepositoryMeta>payload?.meta };
    state.links = { ...state.links, ...<RepositoryLinks>payload?.links };
  };

  const fetchNext = async () => {
    if (typeof state.links?.next !== 'string') {
      return;
    }

    const { error, data } = await uri(state.links?.next || '').get().json<TagsResponse>();

    // On error
    state.error = error || null;

    update(data.value);
  };

  const fetchQuery = async () => {
    if (typeof state.links?.first === 'string') {
      return;
    }

    const query = stringify(state.filters).toString();

    const { error, data } = await api(`tags?${query}`).get().json<TagsResponse>();

    // On error
    state.error = error || null;

    update(data.value);
  };

  const populate = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const reset = (payload?: TagsFilters) => {
    state.id = +new Date();
    state.data = [];
    state.meta = undefined;
    state.links = undefined;
    state.filters = { ...state.filters, ...payload };
  };

  return {
    populate,
    reset,
    state,
  };
};
