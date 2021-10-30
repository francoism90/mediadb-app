import { AxiosResponse } from 'axios';
import { VideoModel } from 'components/App/Views/Video';
import { useStore } from 'components/App/Views/Videos/store';
import { PaginateQuery, PaginateResponse } from 'components/UIComponents/Paginations';
import { api } from 'src/boot/axios';
import { reactive } from 'vue';

export interface QueryResponse extends PaginateResponse {
  data: VideoModel[],
}

export const state = reactive(<QueryResponse>{});

export const store = useStore();

export const sorters = [
  { label: 'Relevance', value: 'relevance' },
  { label: 'Trending', value: 'trending' },
  { label: 'Most Recent', value: '-created_at' },
  { label: 'Most Views', value: '-views' },
  { label: 'Longest', value: '-duration' },
  { label: 'Shortest', value: 'duration' },
];

export const setState = (response: QueryResponse) => Object.assign(state, response);

const fetchNext = async (): Promise<void> => {
  if (!store.isFetchable) {
    return;
  }

  const response = await api.get<string, AxiosResponse<QueryResponse>>(store.links?.next || '');

  setState(response.data);
};

const fetchQuery = async (): Promise<void> => {
  if (!store.isQueryable) {
    return;
  }

  const response = await api.get<PaginateQuery, AxiosResponse<QueryResponse>>('videos', {
    params: store.query,
  });

  setState(response.data);
};

export const fetch = async (): Promise<void> => {
  await fetchNext();
  await fetchQuery();
};
