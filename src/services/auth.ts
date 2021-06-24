import { setAuthHeader } from 'src/boot/axios';
import { useSessionStore } from 'src/store/session';
import { SessionStorage } from 'quasar';
import { auth, login, logout } from 'src/repositories/user';
import { RouteLocationNormalized } from 'vue-router';
import { AuthUser, LoginUser } from 'src/interfaces/session';
import { setCsrfCookie } from 'src/services/api';

export const store = useSessionStore();

export function getToken(): string | null {
  return SessionStorage.getItem('token');
}

export function setToken(payload: string | null): void {
  store.reset(); // invalid current data

  setAuthHeader(payload || '');
  SessionStorage.set('token', payload || '');
}

export async function setUser(): Promise<void> {
  try {
    const response = await auth({ token: store.token || '' });
    store.user = response.user;
  } catch {
    setToken(null);
  }
}

export async function initialize(): Promise<void> {
  store.token = getToken();

  if (!store.isAuthenticated) {
    setToken(null);
    return;
  }

  await setUser();
}

export async function signIn(payload: LoginUser): Promise<void> {
  await setCsrfCookie();

  const response = await login(payload);
  store.initialize(response);
}

export async function signOut(payload: AuthUser): Promise<void> {
  await logout(payload);
  setToken(null);
}

export function check(payload: RouteLocationNormalized): boolean {
  const { isAuthenticated } = store;

  store.redirectUri = null;

  if (!isAuthenticated) {
    store.redirectUri = payload.fullPath || '/';
  }

  return isAuthenticated;
}
