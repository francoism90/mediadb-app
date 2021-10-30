import { AxiosResponse } from 'axios';
import { getToken, store } from 'components/UIComponents/Sessions';
import { api } from 'src/boot/axios';

export interface LogoutForm {
  token: string,
}

export const signOut = async (): Promise<void> => {
  // Reset session store
  store.$reset();

  // Try to logout user
  await api.post<LogoutForm, AxiosResponse<undefined>>('logout', {
    token: getToken() || '',
  });
};
