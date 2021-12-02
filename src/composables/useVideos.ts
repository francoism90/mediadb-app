import { filter } from 'lodash';
import { all, get } from 'src/services/api';
import { useStore } from 'src/store/videos/items';
import { computed } from 'vue';

export const useVideos = () => {
  const store = useStore();

  const sorters = [
    { label: 'Default', value: null },
    { label: 'Most Recent', value: 'created:desc' },
    { label: 'Longest', value: 'duration:desc' },
    { label: 'Shortest', value: 'duration:asc' },
  ];

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

    const response = await all('videos', store.params);

    store.populate(response);
  };

  const fetch = async () => {
    await fetchNext();
    await fetchQuery();
  };

  const filters = computed(() => filter(store.params));
  const sorter = computed(() => store.params.sort);

  return {
    fetch,
    filters,
    sorter,
    sorters,
    store,
  };
};
