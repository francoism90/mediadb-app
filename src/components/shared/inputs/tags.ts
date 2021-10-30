import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { VideoModel } from 'src/components/app/Views/Video';
import { useStore } from 'src/components/app/Views/Videos/store';
import { PaginateQuery, PaginateResponse } from 'src/components/shared/paginations';
import { reactive } from 'vue';

export interface QueryResponse extends PaginateResponse {
  data: VideoModel[],
}

export const state = reactive(<QueryResponse>{});

export const store = useStore();

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
