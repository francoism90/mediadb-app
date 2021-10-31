import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { AuthRequest, AuthResponse, LoginRequest } from 'src/interfaces';
import { useStore } from 'src/store/session';

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string): void => LocalStorage.set('token', payload);

export const initialize = async (payload?: AuthRequest): Promise<void> => {
  const requestToken = payload?.token || getToken() || '';
  const requestUri = payload?.redirectUri;

  // Reset on token change
  if (store.token !== requestToken) {
    store.$reset();
  }

  // Fetch requested user
  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('auth', {
    headers: {
      Authorization: `Bearer ${requestToken}`,
    },
  });

  // Update auth header
  setAuthHeader(response.data.token);

  // Update session store
  store.$patch({
    redirectUri: requestUri || store.redirectUri,
    token: response.data.token,
    user: response.data.user,
  });
};

export const check = async (payload?: AuthRequest): Promise<boolean> => {
  try {
    await initialize(payload);

    return true;
  } catch {
    //
  }

  return false;
};

export const authenticate = async (params: LoginRequest, replace?: boolean): Promise<AuthResponse> => {
  const response = await api.post<LoginRequest, AxiosResponse<AuthResponse>>('login', params);

  if (replace) {
    await initialize(<AuthRequest>{ token: response.data?.token || '' });
  }

  return response.data;
};

export const destroy = async (params: AuthRequest, reset?: boolean): Promise<AuthResponse> => {
  if (reset) {
    setToken('');
  }

  const response = await api.post<AuthRequest, AxiosResponse<AuthResponse>>('logout', params);

  return response.data;
};
