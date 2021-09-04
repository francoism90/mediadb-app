import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { CsrfCookie } from 'src/interfaces/session';

export async function setCsrfCookie(): Promise<void> {
  await api.get<CsrfCookie, AxiosResponse<CsrfCookie>>('sanctum/csrf-cookie');
}

export async function getBlob(url: string): Promise<Blob> {
  const response = await api.get<Blob, AxiosResponse<Blob>>(url, {
    responseType: 'blob',
  });

  return response.data;
}
