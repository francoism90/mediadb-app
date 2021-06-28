import { api } from 'src/boot/axios';
import { all } from 'src/repositories/tag';
import { useTagsStore } from 'src/store/tags';

export default function useTags() {
  const store = useTagsStore();

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

  return {
    store,
    fetchAll,
  };
}
