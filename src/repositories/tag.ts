import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { TagResponse, TagsQuery, TagsResponse } from 'src/interfaces/tag';

export const find = async (id: string): Promise<TagResponse> => {
  const response = await api.get<string, AxiosResponse<TagResponse>>(
    `tags/${id}`,
  );

  return response.data;
};

export const all = async (params: TagsQuery): Promise<TagsResponse> => {
  const response = await api.get<TagsQuery, AxiosResponse<TagsResponse>>(
    'tags', { params },
  );

  return response.data;
};
