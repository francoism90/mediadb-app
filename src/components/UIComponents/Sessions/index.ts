import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { UserModel } from 'components/UIComponents/Users';
import { useStore } from 'src/store';

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

export const authenticate = async (payload?: AuthRequest): Promise<void> => {
  const requestToken = payload?.token || getToken() || '';

  // Reset on token change
  if (store.token !== requestToken) {
    store.$reset();
  }

  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('auth', {
    headers: {
      Authorization: `Bearer ${requestToken}`,
    },
  });

  // Update Axios auth header
  setAuthHeader(response.data.token);

  // Update session store
  store.$patch({
    redirectUri: payload?.redirectUri || store.redirectUri,
    token: response.data.token,
    user: response.data.user,
  });
};
