import { api } from 'src/boot/axios';
import { VideosQuery } from 'src/interfaces/video';
import { all } from 'src/repositories/video';
import { useVideosStore } from 'src/store/videos';

export default function useVideos() {
  const store = useVideosStore();

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

  const reset = (): void => {
    store.reset(<VideosQuery>{ 'page[number]': 1 });
  };

  return {
    store,
    fetchAll,
    reset,
  };
}
