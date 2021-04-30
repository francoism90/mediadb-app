import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { CsrfCookie } from 'src/interfaces/session';

export async function setCsrfCookie(): Promise<CsrfCookie> {
  const response = await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie');

  return response.data;
}
