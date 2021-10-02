import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Model, ModelResponse } from 'src/interfaces/repository';
import { AuthResponse, AuthUser, LoginUser } from 'src/interfaces/session';

export async function auth(params: AuthUser): Promise<AuthResponse> {
  const apiToken = params.token || '';

  const response = await api.get<AuthUser, AxiosResponse<AuthResponse>>('user', {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return response.data;
}

export async function login(params: LoginUser): Promise<AuthResponse> {
  const response = await api.post<LoginUser, AxiosResponse<AuthResponse>>('login', params);

  return response.data;
}

export async function logout(params: AuthUser): Promise<AuthResponse> {
  const response = await api.post<AuthUser, AxiosResponse<AuthResponse>>('logout', params);

  return response.data;
}

export async function favorite(params: Model, force?: boolean): Promise<ModelResponse> {
  const response = await api.post<Model, AxiosResponse<ModelResponse>>(
    `user/favorite/${params.id}`, <Model>{
      favorite: force,
    },
  );

  return response.data;
}

export async function follow(params: Model, force?: boolean): Promise<ModelResponse> {
  const response = await api.post<Model, AxiosResponse<ModelResponse>>(
    `user/follow/${params.id}`, <Model>{
      following: force,
    },
  );

  return response.data;
}
