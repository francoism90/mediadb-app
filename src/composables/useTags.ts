import { filter } from 'lodash';
import { all, get } from 'src/services/api';
import { useStore } from 'src/store/tag/items';
import { computed } from 'vue';

export const useTags = () => {
  const store = useStore();

  const sorters = [
    { label: 'Alphabetical', value: 'name:asc' },
    { label: 'Items', value: 'items:desc' },
  ];

  const fetchNext = async () => {
    if (!store.isFetchable) {
      return;
    }

    const response = await get(store.links?.next || 'tags');

    store.populate(response);
  };

  const fetchQuery = async () => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all('tags', store.params);

    store.populate(response);
  };

  const fetch = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const filters = computed(() => filter(store.params));
  const sorter = computed(() => store.params.sort);

  return {
    filters,
    sorter,
    sorters,
    store,
    fetch,
  };
};
