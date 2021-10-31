import { filter } from 'lodash';
import { all, get } from 'src/services/api';
import { useStore } from 'src/store/videos/items';
import { computed } from 'vue';

export const useVideos = () => {
  const store = useStore();

  const sorters = [
    { label: 'Relevance', value: 'relevance' },
    { label: 'Trending', value: 'trending' },
    { label: 'Most Recent', value: '-created_at' },
    { label: 'Most Views', value: '-views' },
    { label: 'Longest', value: '-duration' },
    { label: 'Shortest', value: 'duration' },
  ];

  const fetchNext = async (): Promise<void> => {
    if (!store.isFetchable) {
      return;
    }

    const response = await get(store.links?.next || 'videos');

    store.populate(response);
  };

  const fetchQuery = async (): Promise<void> => {
    if (!store.isQueryable) {
      return;
    }

    const response = await all('videos', store.query);

    store.populate(response);
  };

  const fetch = async (): Promise<void> => {
    await fetchNext();
    await fetchQuery();
  };

  const filters = computed(() => filter(store.query.filter));
  const sorter = computed(() => store.query.sort);

  return {
    fetch,
    filters,
    sorter,
    sorters,
    store,
  };
};
