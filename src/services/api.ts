import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Model, ModelResponse, RepositoryQuery, RepositoryResponse } from 'src/interfaces';

export const blob = async (url: string): Promise<Blob> => {
  const response = await api.get<Blob, AxiosResponse<Blob>>(url, {
    responseType: 'blob',
  });

  return response.data;
};

export const find = async (path: string): Promise<ModelResponse> => {
  const response = await api.get<string, AxiosResponse<ModelResponse>>(path);

  return response.data;
};

export const all = async (path: string, params?: RepositoryQuery): Promise<RepositoryResponse> => {
  const response = await api.get<RepositoryQuery, AxiosResponse<RepositoryResponse>>(
    path, { params },
  );

  return response.data;
};

export const get = async (url: string): Promise<RepositoryResponse> => {
  const response = await api.get<string, AxiosResponse<RepositoryResponse>>(url);

  return response.data;
};

export const save = async (path: string, data: Model): Promise<RepositoryResponse> => {
  const response = await api.patch<Model, AxiosResponse<RepositoryResponse>>(path, data);

  return response.data;
};

export const remove = async (path: string): Promise<ModelResponse> => {
  const response = await api.delete<string, AxiosResponse<ModelResponse>>(path);

  return response.data;
};

export const favorite = async (params: Model, force?: boolean): Promise<Model> => {
  const response = await api.post<Model, AxiosResponse<Model>>(`user/favorite/${params.id}`, <Model>{
    favorite: force,
  });

  return response.data;
};

export const follow = async (params: Model, force?: boolean): Promise<Model> => {
  const response = await api.post<Model, AxiosResponse<Model>>(`user/follow/${params.id}`, <Model>{
    following: force,
  });

  return response.data;
};
