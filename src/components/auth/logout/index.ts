import { AxiosResponse } from 'axios';
import { api } from 'src/boot/axios';
import { getToken, store } from 'src/components/shared/sessions';
import { LogoutForm } from 'src/interfaces/session';

export const signOut = async (): Promise<void> => {
  store.$reset();

  await api.post<LogoutForm, AxiosResponse<undefined>>('logout', {
    token: getToken() || '',
  });
};
