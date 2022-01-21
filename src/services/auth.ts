import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { AuthRequest, AuthResponse, LoginRequest } from 'src/interfaces';
import { useStore } from 'src/store/session';

export const store = useStore();

export const getItem = (key: string, fallback?: string | number | boolean) => LocalStorage.getItem(key) ?? fallback;

export const setItem = (key: string, value: string | number | boolean) => LocalStorage.set(key, value);

export const getToken = () => getItem('token') ?? '';

export const setToken = (payload: string) => setItem('token', payload);

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
      Authorization: `Bearer ${<string>requestToken}`,
    },
  });

  const redirectUri = requestUri || store.redirectUri;
  const token = response.data?.token;
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
    const token = response.data?.token || '';

    await initialize({ token });
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
