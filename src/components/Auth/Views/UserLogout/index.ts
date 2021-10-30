import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { getToken, store } from 'src/components/UIComponents/Sessions';

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
