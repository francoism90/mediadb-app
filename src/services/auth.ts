import { AuthUser, LoginUser } from 'src/interfaces/session';
import { auth, login, logout } from 'src/repositories/user';

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
