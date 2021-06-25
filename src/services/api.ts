import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { CsrfCookie } from 'src/interfaces/session';

export async function setCsrfCookie(): Promise<void> {
  await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie');
}
