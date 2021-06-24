import { AxiosRequestConfig, AxiosResponse } from 'axios';
import { api } from 'boot/axios';
import {
  VideoModel, VideoResponse, VideosResponse,
} from 'src/interfaces/video';

export async function find(id: string | number): Promise<VideoResponse> {
  const response = await api.get<VideoResponse, AxiosResponse<VideoResponse>>(
    `videos/${id}`,
  );

  return response.data;
}

export async function all(params: AxiosRequestConfig): Promise<VideosResponse> {
  const response = await api.get<VideosResponse, AxiosResponse<VideosResponse>>(
    'videos', params,
  );

  return response.data;
}

export async function update(params: VideoModel): Promise<VideoResponse> {
  const response = await api.patch<VideoResponse, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`, params,
  );

  return response.data;
}

export async function remove(params: VideoModel): Promise<VideoResponse> {
  const response = await api.delete<VideoResponse, AxiosResponse<VideoResponse>>(
    `videos/${params.id}`,
  );

  return response.data;
}
