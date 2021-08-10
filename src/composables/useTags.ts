import { api } from 'src/boot/axios';
import { all } from 'src/repositories/tag';
import { useStore } from 'src/store/tags/items';

export default function useTags() {
  const store = useStore();

  const fetchQuery = async (): Promise<void> => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all(store.query);
    store.populate(response);
  };

  const fetchNext = async (): Promise<void> => {
    if (!store.isFetchable || !store.links.next) {
      return;
    }

    const response = await api.get(store.links.next);
    store.populate(response.data);
  };

  const fetch = async (): Promise<void> => {
    await fetchQuery();
    await fetchNext();
  };

  return {
    store,
    fetch,
  };
}
