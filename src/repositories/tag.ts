import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { TagResponse, TagsQuery, TagsResponse } from 'src/interfaces/tag';

export async function find(id: string | number): Promise<TagResponse> {
  const response = await api.get<TagResponse, AxiosResponse<TagResponse>>(
    `tags/${id}`,
  );

  return response.data;
}

export async function all(params: TagsQuery): Promise<TagsResponse> {
  const response = await api.get<TagsResponse, AxiosResponse<TagsResponse>>(
    'tags', { params },
  );

  return response.data;
}
