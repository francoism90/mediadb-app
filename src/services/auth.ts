import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { AuthRequest, AuthResponse, LoginRequest } from 'src/interfaces';
import { useStore } from 'src/store/session';

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string) => {
  // Set token in local storage
  LocalStorage.set('token', payload);

  // Set axios header
  setAuthHeader(payload);
};

export const initialize = async (payload?: AuthRequest) => {
  const requestToken = payload?.token || getToken();
  const requestUri = payload?.redirectUri;

  // Reset on token change
  if (!requestToken || store.token !== requestToken) {
    store.$reset();
  }

  // Fetch requested user
  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('user', {
    headers: {
      Authorization: `Bearer ${requestToken || ''}`,
    },
  });

  // Update token
  setToken(response.data.token);

  // Update session store
  store.initialize({
    redirectUri: requestUri || store.redirectUri,
    token: response.data.token,
    user: response.data.user,
  });
};

export const check = async (payload?: AuthRequest) => {
  try {
    await initialize(payload);
  } catch {
    //
  }

  return store.isAuthenticated;
};

export const authenticate = async (params: LoginRequest, replace?: boolean) => {
  const response = await api.post<LoginRequest, AxiosResponse<AuthResponse>>('login', params);

  if (replace) {
    await initialize(<AuthRequest>{ token: response.data?.token || '' });
  }
};

export const destroy = async (params: AuthRequest, reset?: boolean) => {
  try {
    await api.post<AuthRequest, AxiosResponse<AuthResponse>>('logout', params);
  } catch {
    //
  }

  if (reset) {
    setToken('');
  }
};
