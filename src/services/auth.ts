import { useStore } from 'src/store/session';
import { LocalStorage } from 'quasar';
import { auth, login, logout } from 'src/repositories/user';
import { AuthUser, LoginUser } from 'src/interfaces/session';
import { setAuthHeader } from 'src/boot/axios';

export const store = useStore();

export function getToken(): string | null {
  return LocalStorage.getItem('token');
}

export function setToken(payload: string | null): void {
  LocalStorage.set('token', payload || '');
}

export async function authenticate(payload: AuthUser): Promise<boolean> {
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
}

export async function signIn(payload: LoginUser): Promise<void> {
  const response = await login(payload);
  store.initialize(response);
  setToken(store.token);

  await authenticate({ redirectUri: store.redirectUri });
}

export async function signOut(payload: AuthUser): Promise<void> {
  await logout(payload);

  store.$reset();
  setToken(null);
}
