import { all, get } from 'src/repositories/video';
import { useStore } from 'src/store/video/items';

export default function useVideos() {
  const store = useStore();

  const fetchNext = async (): Promise<void> => {
    if (!store.isFetchable || !store.links?.next) {
      return;
    }

    const response = await get(store.links.next);
    store.populate(response);
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
    fetch,
    store,
  };
}
