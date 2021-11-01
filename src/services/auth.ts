import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { AuthRequest, AuthResponse, LoginRequest } from 'src/interfaces';
import { useStore } from 'src/store/session';

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string) => LocalStorage.set('token', payload);

export const initialize = async (payload?: AuthRequest) => {
  const requestToken = payload?.token || getToken();
  const requestUri = payload?.redirectUri;

  // Reset store on token change
  if (!requestToken || store.token !== requestToken) {
    store.$reset();
  }

  // Fetch requested user using token
  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('user', {
    headers: {
      Authorization: `Bearer ${requestToken || ''}`,
    },
  });

  const redirectUri = requestUri || store.redirectUri;
  const token = response.data?.token || '';
  const user = response.data?.user || undefined;

  // Set Bearer
  setAuthHeader(token);
  setToken(token);

  // Update session store
  store.initialize({ redirectUri, token, user });
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
    // Set Bearer
    setAuthHeader('');
    setToken('');

    // Restore session store
    store.$reset();
  }
};
