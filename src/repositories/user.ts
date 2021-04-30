import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { AuthResponse, AuthUser, LoginUser } from 'src/interfaces/session';
import { UserResponse } from 'src/interfaces/user';

export async function authUser(params: AuthUser): Promise<AuthResponse> {
  const apiToken = params.token || '';

  const response = await api.get<UserResponse, AxiosResponse<AuthResponse>>('auth/user', {
    headers: {
      Authorization: `Bearer ${apiToken}`,
    },
  });

  return response.data;
}

export async function loginUser(params: LoginUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/login', params);

  return response.data;
}

export async function logoutUser(params: AuthUser): Promise<AuthResponse> {
  const response = await api.post<AuthResponse, AxiosResponse<AuthResponse>>('auth/logout', params);

  return response.data;
}
