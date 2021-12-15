import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Model, ModelResponse, RepositoryParams, RepositoryResponse } from 'src/interfaces';

export const blob = async (url: string): Promise<Blob> => {
  const response = await api.get<Blob, AxiosResponse<Blob>>(url, {
    responseType: 'blob',
  });

  return response.data;
};

export const find = async (path: string) => {
  const response = await api.get<string, AxiosResponse<ModelResponse>>(path);

  return response.data;
};

export const all = async (path: string, params?: RepositoryParams) => {
  const response = await api.get<RepositoryParams, AxiosResponse<RepositoryResponse>>(path, {
    params,
  });

  return response.data;
};

export const get = async (url: string) => {
  const response = await api.get<string, AxiosResponse<RepositoryResponse>>(url);

  return response.data;
};

export const save = async (path: string, data: Model | undefined) => {
  const response = await api.patch<Model, AxiosResponse<RepositoryResponse>>(path, data);

  return response.data;
};

export const remove = async (path: string) => {
  const response = await api.delete<string, AxiosResponse<ModelResponse>>(path);

  return response.data;
};
