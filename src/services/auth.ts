import { useSessionStore } from 'src/store/session';
import { SessionStorage } from 'quasar';
import { auth, login, logout } from 'src/repositories/user';
import { AuthUser, LoginUser } from 'src/interfaces/session';
import { setCsrfCookie } from 'src/services/api';

export const store = useSessionStore();

export function getToken(): string | null {
  return SessionStorage.getItem('token');
}

export function setToken(payload: string | null): void {
  SessionStorage.set('token', payload || '');
}

export async function authenticate(payload: AuthUser): Promise<boolean> {
  const sessionToken = payload.token || getToken();

  try {
    const response = await auth({ token: sessionToken || '' });
    store.initialize(response);
  } catch {
    store.reset();
    store.redirectUri = payload.redirectUri || '/';
  }

  return store.isAuthenticated;
}

export async function signIn(payload: LoginUser): Promise<void> {
  await setCsrfCookie();

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
