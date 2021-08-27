import { AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import { VideoResponse } from 'src/interfaces/video';

export async function capture(id: string | number, offset: number): Promise<VideoResponse> {
  const response = await api.get<VideoResponse, AxiosResponse<VideoResponse>>(
    `vod/capture/${id}/${offset}`,
  );

  return response.data;
}
