import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { UserModel } from 'src/components/UIComponents/Users';
import { useStore } from 'src/store/session';

export interface AuthRequest {
  redirectUri?: string,
  token?: string,
}

export interface AuthResponse {
  token: string,
  user: UserModel,
}

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string): void => LocalStorage.set('token', payload);

export const authenticate = async (payload: AuthRequest): Promise<void> => {
  const sessionToken = payload.token || getToken() || '';
  const redirectUri = payload.redirectUri || store.redirectUri;

  // Reset session store
  store.$reset();

  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('auth', {
    headers: {
      Authorization: `Bearer ${sessionToken}`,
    },
  });

  // Update Axios auth header
  setAuthHeader(sessionToken);

  // Set session store
  store.redirectUri = redirectUri;
  store.token = response.data.token;
  store.user = response.data.user;
};
