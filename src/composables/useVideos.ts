import { find, findIndex, mergeWith, remove } from 'lodash';
import { mergeDeep, stringify } from 'src/helpers';
import { RepositoryLinks, RepositoryMeta, VideoModel, VideosFilters, VideosResponse, VideosState } from 'src/interfaces';
import { router } from 'src/router';
import { api, uri } from 'src/services/api';
import { reactive, readonly } from 'vue';

const state = reactive(<VideosState>{
  id: null,
  data: [],
  meta: undefined,
  links: undefined,
  error: undefined,
  filters: undefined,
});

export const useVideos = () => {
  const update = (payload: VideosResponse | null) => {
    state.data = state.data.concat(payload?.data || []);
    state.meta = { ...state.meta, ...<RepositoryMeta>payload?.meta };
    state.links = { ...state.links, ...<RepositoryLinks>payload?.links };
  };

  const fetchNext = async () => {
    if (typeof state.links?.next !== 'string') {
      return;
    }

    const { error, data } = await uri(state.links?.next || '').get().json<VideosResponse>();

    // On error
    state.error = error || null;

    update(data.value);
  };

  const fetchQuery = async () => {
    if (typeof state.links?.first === 'string') {
      return;
    }

    const query = stringify(state.filters).toString();

    const { error, data } = await api(`videos?${query}`).get().json<VideosResponse>();

    // On error
    state.error = error || null;

    update(data.value);
  };

  const populate = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const reset = async (payload?: VideosFilters) => {
    state.id = +new Date();
    state.data = [];
    state.meta = undefined;
    state.links = undefined;
    state.filters = { ...state.filters, ...payload };

    // Make sure page is active
    await router.push({ name: 'home' });
  };

  const deleted = (payload: VideoModel) => {
    remove(state.data, { id: payload.id });
  };

  const replaced = (payload: VideoModel) => {
    const index = findIndex(state.data, { id: payload.id });

    if (index >= 0) {
      const model = find(state.data, { id: payload.id });
      const object = mergeWith(model, payload, mergeDeep);

      state.data.splice(index, 1, object);
    }
  };

  // const filters = computed(() => filter(store.params));

  return {
    populate,
    reset,
    deleted,
    replaced,
    state: readonly(state),
  };
};
