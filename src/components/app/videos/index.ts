import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { useStore } from 'src/components/app/Views/Videos/store';
import { RepositoryQuery } from 'src/interfaces/repository';
import { VideosReponse } from 'src/interfaces/video';
import { reactive } from 'vue';

export const state = reactive(<VideosReponse>{});

export const store = useStore();

export const sorters = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Recent', value: '-created_at' },
  { label: 'Most Views', value: '-views' },
  { label: 'Longest', value: '-duration' },
  { label: 'Shortest', value: 'duration' },
];

export const setState = (response: VideosReponse) => Object.assign(state, response);

const fetchNext = async (): Promise<void> => {
  if (!store.isFetchable) {
    return;
  }

  const response = await api.get<string, AxiosResponse<VideosReponse>>(store.links?.next || '');

  setState(response.data);
};

const fetchQuery = async (): Promise<void> => {
  if (!store.isQueryable) {
    return;
  }

  const response = await api.get<RepositoryQuery, AxiosResponse<VideosReponse>>('videos', {
    params: store.query,
  });

  setState(response.data);
};

export const fetch = async (): Promise<void> => {
  await fetchNext();
  await fetchQuery();
};
