import { api } from 'src/boot/axios';
import { VideoModel, VideosQuery } from 'src/interfaces/video';
import { all } from 'src/repositories/video';
import { useRelatedStore } from 'src/store/related';

export default function useRelated() {
  const store = useRelatedStore();

  const useQuery = async (): Promise<void> => {
    if (!store.firstLoad || !store.query) {
      return;
    }

    const response = await all(store.query);
    store.populate(response);
  };

  const useNext = async (): Promise<void> => {
    if (!store.isLoadable || !store.links.next) {
      return;
    }

    const response = await api.get(store.links.next);
    store.populate(response.data);
  };

  const fetchAll = async (): Promise<void> => {
    await useQuery();
    await useNext();
  };

  const reset = (payload: VideoModel): void => {
    store.reset(<VideosQuery>{
      filter: { related: payload.id },
      page: { number: 1 },
    });
  };

  return {
    store,
    fetchAll,
    reset,
  };
}
