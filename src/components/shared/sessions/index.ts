import { AxiosResponse } from 'axios';
import { LocalStorage } from 'quasar';
import { api, setAuthHeader } from 'src/boot/axios';
import { AuthRequest, AuthResponse } from 'src/interfaces/session';
import { useStore } from 'src/store';

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string): void => LocalStorage.set('token', payload);

export const authenticate = async (payload?: AuthRequest): Promise<void> => {
  const requestToken = payload?.token || getToken() || '';

  // Reset on token change
  if (store.token !== requestToken) {
    store.$reset();
    store.redirectUri = payload?.redirectUri || '/';
  }

  // Fetch user
  const response = await api.get<AuthRequest, AxiosResponse<AuthResponse>>('auth', {
    headers: {
      Authorization: `Bearer ${requestToken}`,
    },
  });

  // Set Axios auth header
  setAuthHeader(response.data.token);

  // Update session store
  store.$patch({
    token: response.data.token,
    user: response.data.user,
  });
};

export const authenticated = async (payload?: AuthRequest): Promise<boolean> => {
  try {
    await authenticate(payload);

    return true;
  } catch {
    // TODO: Add logging?
  }

  return false;
};
