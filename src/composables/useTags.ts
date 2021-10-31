import { filter } from 'lodash';
import { all, get } from 'src/services/api';
import { useStore } from 'src/store/tag/items';
import { computed } from 'vue';

export const useTags = () => {
  const store = useStore();

  const sorters = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Trending', value: 'trending' },
    { label: 'Most Recent', value: '-created_at' },
    { label: 'Most Views', value: '-views' },
    { label: 'Longest', value: '-duration' },
    { label: 'Shortest', value: 'duration' },
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

    const response = await all('tags', store.query);

    store.populate(response);
  };

  const fetch = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const filters = computed(() => filter(store.query.filter));
  const sorter = computed(() => store.query.sort);

  return {
    filters,
    sorter,
    sorters,
    store,
    fetch,
  };
};
