import { api } from 'src/boot/axios';
import { VideoModel } from 'src/interfaces/video';
import { all } from 'src/repositories/video';
import { useStore } from 'src/store/videos/related';

export default function useQueue() {
  const store = useStore();

  const fetchQuery = async (): Promise<void> => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all(store.query);
    store.populate(response);
  };

  const fetchNext = async (): Promise<void> => {
    if (!store.isFetchable) {
      return;
    }

    const response = await api.get(store.links.next || '');
    store.populate(response.data);
  };

  const fetch = async (): Promise<void> => {
    await fetchQuery();
    await fetchNext();
  };

  const initialize = (payload: VideoModel): void => {
    store.reset({
      filter: { related: payload.id },
    });
  };

  return {
    fetch,
    initialize,
    store,
  };
}
