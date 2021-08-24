import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { Model, ModelResponse } from 'src/interfaces/repository';
import { AuthResponse, AuthUser, LoginUser } from 'src/interfaces/session';
import { UserResponse } from 'src/interfaces/user';

export async function auth(params: AuthUser): Promise<AuthResponse> {
  const apiToken = params.token || '';

  const response = await api.get<UserResponse, AxiosResponse<AuthResponse>>('auth/user', {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return response.data;
}

export async function login(params: LoginUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/login', params);

  return response.data;
}

export async function logout(params: AuthUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/logout', params);

  return response.data;
}

export async function favorite(params: Model): Promise<ModelResponse> {
  const response = await api.post<ModelResponse, AxiosResponse<ModelResponse>>(
    `user/favorite/${params.id}`,
  );

  return response.data;
}

export async function follow(params: Model): Promise<ModelResponse> {
  const response = await api.post<ModelResponse, AxiosResponse<ModelResponse>>(
    `user/follow/${params.id}`,
  );

  return response.data;
}
