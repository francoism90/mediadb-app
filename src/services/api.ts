import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';

export const getBlob = async (url: string): Promise<Blob> => {
  const response = await api.get<Blob, AxiosResponse<Blob>>(url, {
    responseType: 'blob',
  });

  return response.data;
};
