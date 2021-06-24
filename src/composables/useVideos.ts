import { api } from 'src/boot/axios';
import { all } from 'src/repositories/video';
import { useVideosStore } from 'src/store/videos';

export default function useVideos() {
  const store = useVideosStore();

  const useQuery = async (): Promise<void> => {
    const response = await all(store.query);
    store.populate(response);
  };

  const useNext = async (): Promise<void> => {
    if (!store.links.next) {
      return;
    }

    const response = await api.get(store.links.next);
    store.populate(response.data);
  };

  const fetchAll = async (): Promise<void> => {
    if (store.firstLoad) {
      await useQuery();
    } else if (!store.firstLoad && store.isLoadable) {
      await useNext();
    }
  };

  return {
    fetchAll,
  };
}
