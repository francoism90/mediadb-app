import { setAuthHeader } from 'src/boot/axios';
import { useSessionStore } from 'src/store/session';
import { SessionStorage } from 'quasar';
import { auth } from 'src/repositories/user';
import { RouteLocationNormalized } from 'vue-router';

export const store = useSessionStore();

export function getToken(): string | null {
  return SessionStorage.getItem('token');
}

export function setToken(payload: string): void {
  setAuthHeader(payload);
  SessionStorage.set('token', payload);
}

export async function initialize(): Promise<void> {
  const { isAuthenticated } = store;

  const reset = (): void => {
    store.reset();
    setToken('');
  };

  store.token = getToken();

  if (!isAuthenticated) {
    reset();
    return;
  }

  // Set user
  try {
    const response = await auth({ token: store.token || '' });
    store.user = response.user;
  } catch {
    reset();
  }
}

export function check(payload: RouteLocationNormalized): boolean {
  const { isAuthenticated } = store;

  store.redirectUri = null;

  if (!isAuthenticated) {
    store.redirectUri = payload.fullPath || '/';
  }

  return isAuthenticated;
}
