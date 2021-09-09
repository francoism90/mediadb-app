import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';

export async function getBlob(url: string): Promise<Blob> {
  const response = await api.get<Blob, AxiosResponse<Blob>>(url, {
    responseType: 'blob',
  });

  return response.data;
}
