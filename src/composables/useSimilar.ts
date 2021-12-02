import { filter } from 'lodash';
import { all, get } from 'src/services/api';
import { useStore } from 'src/store/videos/similar';
import { computed } from 'vue';

export const useSimilar = (id: string) => {
  const store = useStore();

  const sorters = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Trending', value: 'trending' },
    { label: 'Most Recent', value: '-created_at' },
    { label: 'Most Views', value: '-views' },
    { label: 'Longest', value: '-duration' },
    { label: 'Shortest', value: 'duration' },
  ];

  const initialize = () => store.reset();

  const fetchNext = async () => {
    if (!store.isFetchable) {
      return;
    }

    const response = await get(store.links?.next || 'videos');

    store.populate(response);
  };

  const fetchQuery = async () => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all(`videos/similar/${id}`, store.params);

    store.populate(response);
  };

  const fetch = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const filters = computed(() => filter(store.params));
  const sorter = computed(() => store.params.sort);

  return {
    initialize,
    fetch,
    filters,
    sorter,
    sorters,
    store,
  };
};
