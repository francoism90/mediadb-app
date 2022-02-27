import { RepositoryLinks, RepositoryMeta, VideoModel, VideosResponse, VideosState } from 'src/interfaces';
import { api, uri } from 'src/services/api';
import { reactive, readonly } from 'vue';

const state = reactive(<VideosState>{});

export const useVideos = () => {
  const update = (payload: VideosResponse | null) => {
    state.data = { ...state.data, ...<VideoModel[]>payload?.data };
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
    console.log('query', state.links);
    if (typeof state.links?.first === 'string') {
      return;
    }

    const { error, data } = await api('videos').get().json<VideosResponse>();

    // On error
    state.error = error || null;

    update(data.value);
  };

  const populate = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const reset = () => {
    state.id = +new Date();
    state.data = undefined;
    state.meta = undefined;
    state.links = undefined;
  };

  // const filters = computed(() => filter(store.params));

  return {
    populate,
    reset,
    state: readonly(state),
    // filters,
    // store,
  };
};
