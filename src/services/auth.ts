import { LocalStorage } from 'quasar';
import { AuthResponse, LoginRequest } from 'src/interfaces';
import { api } from 'src/services/api';

export const getToken = () => LocalStorage.getItem('token') as string | undefined;

export const setToken = (payload: string) => LocalStorage.set('token', payload);

export const authenticate = async (payload: LoginRequest) => {
  const { error, data } = await api('login').post(payload).json<AuthResponse>();

  setToken(data.value?.token || '');

  return {
    error,
    data,
  };
};

export const check = () => api('user').get().json<AuthResponse>();

export const destroy = async () => {
  const { error, data } = await api('logout').post().json<AuthResponse>();

  setToken('');

  return {
    error,
    data,
  };
};
