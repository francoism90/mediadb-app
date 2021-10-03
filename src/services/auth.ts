import { LocalStorage } from 'quasar';
import { setAuthHeader } from 'src/boot/axios';
import { AuthUser, LoginUser } from 'src/interfaces/session';
import { auth, login, logout } from 'src/repositories/user';
import { useStore } from 'src/store/session';

export const store = useStore();

export const getToken = (): string | null => LocalStorage.getItem('token');

export const setToken = (payload: string | null): void => LocalStorage.set('token', payload || '');

export const authenticate = async (payload: AuthUser): Promise<boolean> => {
  const sessionToken = payload.token || getToken();
  store.redirectUri = payload.redirectUri || '/';

  try {
    setAuthHeader(sessionToken || '');

    const response = await auth({ token: sessionToken || '' });
    store.initialize(response);
  } catch {
    store.reset();
  }

  return store.isAuthenticated;
};

export const signIn = async (payload: LoginUser): Promise<void> => {
  const response = await login(payload);
  store.initialize(response);
  setToken(store.token);

  await authenticate({ redirectUri: store.redirectUri });
};

export const signOut = async (payload: AuthUser): Promise<void> => {
  await logout(payload);

  store.$reset();
  setToken(null);
};
