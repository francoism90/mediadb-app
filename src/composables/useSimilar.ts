import { api } from 'src/boot/axios';
import { all } from 'src/repositories/video';
import { useStore } from 'src/store/video/similar';

export default function useSimilar() {
  const store = useStore();

  const fetchNext = async (): Promise<void> => {
    if (!store.isFetchable || !store.links.next) {
      return;
    }

    const response = await api.get(store.links.next);
    store.populate(response.data);
  };

  const fetchQuery = async (): Promise<void> => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all(store.query);
    store.populate(response);
  };

  const fetch = async (): Promise<void> => {
    await fetchNext();
    await fetchQuery();
  };

  return {
    store,
    fetch,
  };
}