import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { CaptureResponse } from 'src/interfaces/vod';

export async function capture(id: string | number, offset: number): Promise<CaptureResponse> {
  const response = await api.get<CaptureResponse, AxiosResponse<CaptureResponse>>(
    `vod/capture/${id}/${offset}`,
  );

  return response.data;
}
