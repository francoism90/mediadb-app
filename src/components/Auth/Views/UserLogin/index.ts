import { AxiosResponse } from 'axios';
import { authenticate, AuthRequest, store } from 'components/UIComponents/Sessions';
import { UserModel } from 'components/UIComponents/Users';
import { api } from 'src/boot/axios';
import { router } from 'src/router';

export interface LoginForm {
  'device_name': string,
  email: string,
  password: string,
  remember: boolean,
}

export interface LoginResponse extends AuthRequest {
  token: string,
  user: UserModel,
}

export const signIn = async (payload: LoginForm): Promise<void> => {
  // Validate login request
  const response = await api.post<LoginForm, AxiosResponse<LoginResponse>>('login', payload);

  // Try to authenticate user
  await authenticate(response.data);

  // Redirect user
  await router.replace(store.redirectUri);
};
